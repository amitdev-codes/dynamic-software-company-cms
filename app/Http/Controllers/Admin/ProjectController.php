<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = Project::query()
            ->select(['id', 'category', 'title', 'description','technologies', 'order','logo','accent','slug'])
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(function ($project) {
                $project->image = $project->getFirstMediaUrl('project_thumbnail');
                return $project;
            });

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());

// Thumbnail
        if ($request->hasFile('thumbnail')) {
            $project
                ->addMediaFromRequest('thumbnail')
                ->toMediaCollection('project_thumbnail');
        }

// Screenshots
        if ($request->hasFile('screenshots')) {
            foreach ($request->file('screenshots') as $file) {
                $project
                    ->addMedia($file)
                    ->toMediaCollection('project_screenshots');
            }
        }

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }


    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

    // Thumbnail (auto replaces because singleFile)
            if ($request->hasFile('thumbnail')) {
                $project
                    ->addMediaFromRequest('thumbnail')
                    ->toMediaCollection('project_thumbnail');
            }

            if ($request->hasFile('screenshots')) {
                $project->clearMediaCollection('project_screenshots');

                foreach ($request->file('screenshots') as $file) {
                    $project
                        ->addMedia($file)
                        ->toMediaCollection('project_screenshots');
                }
            }
        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => [
                ...$project->only([
                   'id', 'category', 'title', 'description','technologies', 'order','logo','accent','slug','project_link',
                ]),

                // ✅ ADD THIS
                'thumbnail' => $project->getFirstMediaUrl('project_thumbnail'),

                // screenshots
                'existingImages' => $project->getMedia('project_screenshots')
                    ->map(fn($media) => $media->getUrl())
                    ->toArray(),
            ]
        ]);
    }
    public function show($slug)
    {
        $project = Project::where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();

        // technologies fix
        $project->technologies = is_string($project->technologies)
            ? json_decode($project->technologies, true)
            : ($project->technologies ?? []);

        // ✅ Get thumbnail
        $project->thumbnail = $project->getFirstMediaUrl('project_thumbnail');

        // ✅ Get screenshots
        $project->screenshots = $project->getMedia('project_screenshots')
            ->map(fn($media) => $media->getUrl())
            ->toArray();

        // ✅ Prepare settings with absolute URLs
        $settings = Setting::first();
        $settings->logo_light = $settings->getFirstMediaUrl('logo_light')
            ? asset($settings->getFirstMediaUrl('logo_light'))
            : asset('image/logo.png'); // fallback
        $settings->favicon = $settings->getFirstMediaUrl('favicon')
            ? asset($settings->getFirstMediaUrl('favicon'))
            : asset('image/logo.png');

        return Inertia::render('Public/ProjectDetail', [
            'project'   => $project,
            'settings'  => $settings,
            'menuItems' => config('menu.items'),
            'services'  => Service::take(5)->get(),
        ]);
    }

}
