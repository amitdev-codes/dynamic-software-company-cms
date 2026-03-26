<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalResources' => Resource::count(),
                'totalUsers' => User::count(),
                'storageUsed' => Resource::sum('file_size'),
            ],
            'recentResources' => Resource::latest()->take(5)->get(),
        ]);
    }
}
