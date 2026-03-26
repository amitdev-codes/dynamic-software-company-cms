<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:100',
            'role'         => 'required|string|max:100',
            'content'      => 'required|string|max:1500',
            'avatar_color' => 'nullable|string|max:100|regex:/^#[0-9A-Fa-f]{6}$/i',
            'avatar_image' => 'nullable|string|max:255', // or use image validation if uploading
            'rating'       => 'required|integer|between:1,5',
            'order'        => 'nullable|integer|min:0',
        ]);

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:100',
            'role'         => 'required|string|max:100',
            'content'      => 'required|string|max:1500',
            'avatar_color' => 'nullable|string|max:100|regex:/^#[0-9A-Fa-f]{6}$/i',
            'avatar_image' => 'nullable|string|max:255', // adjust if needed
            'rating'       => 'required|integer|between:1,5',
            'order'        => 'nullable|integer|min:0',
        ]);

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully.');
    }
}
