<?php

use App\Http\Controllers\Admin\AboutContentController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ============================================
// PUBLIC ROUTES (React via Inertia)
// ============================================
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
Route::post('/contact/submit', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');
// ============================================
// ADMIN ROUTES (React via Inertia - Protected)
// ============================================
Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->name('admin.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // Resources Management
        Route::get('/resources', [ResourceController::class, 'index'])
            ->name('resources.index');

        Route::post('/resources', [ResourceController::class, 'store'])
            ->name('resources.store');

        Route::delete('/resources/{resource}', [ResourceController::class, 'destroy'])
            ->name('resources.destroy');
        // projects
        Route::resource('projects', ProjectController::class)->names('projects');
        // about content
        Route::get('/admin/about/edit', [AboutContentController::class, 'edit'])
            ->name('aboutContent.edit');

        Route::put('/admin/about', [AboutContentController::class, 'update'])
            ->name('aboutContent.update');

        Route::delete('/admin/about/image', [AboutContentController::class, 'destroy'])
            ->name('aboutContent.image.destroy');
        // services
        Route::resource('services', ServiceController::class)->names('services');
        Route::resource('settings', SettingController::class)->names('settings');
        // testimonials
        Route::resource('testimonials', TestimonialController::class)->names('testimonials');
        Route::resource('products', ProductController::class)->names('products');

        // Users Management
        Route::get('/users', function () {
            return Inertia::render('Admin/Users/Index', [
                'users' => \App\Models\User::latest()->paginate(10),
            ]);
        })->name('users.index');


        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::post('/contacts/{id}/respond', [ContactController::class, 'respond']);
        Route::post('/contacts/{id}/read', [ContactController::class, 'markAsRead'])
            ->name('admin.contacts.read');
        Route::delete('/contacts/{id}', [ContactController::class, 'destroy'])
            ->name('admin.contacts.destroy');
        // Media Management
        Route::get('/media', function () {
            return Inertia::render('Admin/Media/Index');
        })->name('media.index');
    });

// ============================================
// AUTH ROUTES (React - From Breeze)
// ============================================
require __DIR__.'/auth.php';
