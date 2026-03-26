<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Resources/Index', [
            'resources' => Resource::latest()->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|max:10240', // 10MB
        ]);

        $file = $request->file('file');
        $path = $file->store('resources', 'public');

        Resource::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'file_path' => $path,
            // 'file_name' => $file->getClientOriginalName(),
            'file_type' => $file->getClientOriginalExtension(),
            'file_size' => $file->getSize(),
        ]);

        return redirect()
            ->route('admin.resources.index')
            ->with('success', 'Resource uploaded successfully!');
    }

    public function destroy(Resource $resource)
    {
        Storage::disk('public')->delete($resource->file_path);
        $resource->delete();

        return redirect()
            ->route('admin.resources.index')
            ->with('success', 'Resource deleted successfully!');
    }
}
