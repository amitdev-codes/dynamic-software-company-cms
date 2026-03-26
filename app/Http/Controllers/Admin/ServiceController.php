<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::query()
            ->select(['id', 'title', 'description','order','image','category'])
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(function ($service) {
                $mediaUrl = $service->getFirstMediaUrl('service_image');

                if ($mediaUrl) {
                    $service->image = $mediaUrl;
                } else {
                    $service->image = asset($service->image);
                }

                return $service;
            });
        return Inertia::render('Admin/Services/Index', [
            'services' => $services
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(StoreServiceRequest $request)
    {
        $service=Service::create($request->validated());

        if ($request->hasFile('image')) {
            $service
                ->addMediaFromRequest('image')
                ->toMediaCollection('service_image');
        }
        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => [
                ...$service->only([
                    'id','title','description','order','category'
                ]),
                'image' => $service->getFirstMediaUrl('service_image'),
                ]
        ]);
    }

    /**
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $service->update($request->validated());
        if ($request->hasFile('image')) {
            $service
                ->addMediaFromRequest('image')
                ->toMediaCollection('service_image');
        }
        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
