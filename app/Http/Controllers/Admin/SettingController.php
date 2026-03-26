<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();

        return Inertia::render('Admin/Settings', [
            'setting' => $setting,
        ]);
    }

    public function store(Request $request)
    {
        $setting = Setting::create($request->except('media'));
        $this->handleMedia($setting, $request);

        return back()->with('success', 'Settings created successfully.');
    }

    public function update(Request $request)
    {
        $setting = Setting::firstOrFail();
        $setting->update($request->except('media'));
        $this->handleMedia($setting, $request);

        return back()->with('success', 'Settings updated successfully.');
    }

    public function destroy()
    {
        $setting = Setting::firstOrFail();
        $setting->delete();

        return back()->with('success', 'Settings deleted.');
    }

    protected function handleMedia(Setting $setting, Request $request)
    {
        if ($request->hasFile('logo_light')) {
            $setting->clearMediaCollection('logo_light');
            $setting->addMediaFromRequest('logo_light')->toMediaCollection('logo_light');
        }

        if ($request->hasFile('logo_dark')) {
            $setting->clearMediaCollection('logo_dark');
            $setting->addMediaFromRequest('logo_dark')->toMediaCollection('logo_dark');
        }

        if ($request->hasFile('favicon')) {
            $setting->clearMediaCollection('favicon');
            $setting->addMediaFromRequest('favicon')->toMediaCollection('favicon');
        }

        if ($request->hasFile('og_image')) {
            $setting->clearMediaCollection('og_image');
            $setting->addMediaFromRequest('og_image')->toMediaCollection('og_image');
        }
    }
}
