<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutContentController extends Controller
{
    /**
     * Show the About content edit page (usually there's only one record)
     */
    public function edit()
    {
        // dd('test');
        $content = AboutContent::firstOrCreate(
            ['id' => 1], // we treat it as singleton
            [
                'years_experience' => 0,
                'global_clients' => 0,
            ]
        );

        return Inertia::render('Admin/About/EditAbout', [
            'content' => $content,
        ]);
    }

    /**
     * Update (or create) the about content
     */
    public function update(Request $request)
    {
        $request->validate([
            'mission_text' => 'nullable|string|max:3000',
            'years_experience' => 'required|integer|min:0|max:100',
            'global_clients' => 'required|integer|min:0|max:10000',
            'other_stats' => 'nullable|json',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $content = AboutContent::firstOrCreate(['id' => 1]);

        $data = $request->only([
            'mission_text',
            'years_experience',
            'global_clients',
            'other_stats',
        ]);

        // Handle image upload
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Delete old image if exists
            if ($content->image_path) {
                Storage::disk('public')->delete($content->image_path);
            }

            $path = $request->file('image')->store('about', 'public');
            $data['image_path'] = $path;
        }

        $content->update($data);

        return back()->with('success', 'About content updated successfully.');
    }

    /**
     * Delete the image only (optional separate action)
     */
    public function destroy()
    {
        $content = AboutContent::first();

        if (! $content || ! $content->image_path) {
            return back()->with('error', 'No image to delete.');
        }

        Storage::disk('public')->delete($content->image_path);
        $content->update(['image_path' => null]);

        return back()->with('success', 'Image removed successfully.');
    }

    // Optional: public endpoint (no auth) if you want to use it in frontend
    public function publicShow()
    {
        $content = AboutContent::first();

        return inertia('About/Show', [
            'content' => $content ?? (object) [
                'mission_text' => '',
                'years_experience' => 0,
                'global_clients' => 0,
                'other_stats' => null,
                'image_path' => null,
            ],
        ]);
    }
}
