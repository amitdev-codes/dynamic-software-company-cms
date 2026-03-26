<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Testimonial;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $menus = [
            ['id' => 'home',      'label' => 'Home'],
            ['id' => 'about',     'label' => 'About Us'],
            ['id' => 'services',  'label' => 'Services'],
            ['id' => 'products',  'label' => 'Products'],
            ['id' => 'projects',  'label' => 'Projects'],
            ['id' => 'testimonials',  'label' => 'Testimonials'],
            ['id' => 'contact',   'label' => 'Contact Us'],
        ];



        return Inertia::render('Public/Landing', [
            'menuItems'    => $menus,
            'services'     => Service::orderBy('order', 'asc')->get(),
            'defaultServices' =>Service::where('category', 'default')->orderBy('order')->get(),
            'comprehensiveServices' =>Service::where('category', 'comprehensive')->orderBy('order')->get(),
            'projects'     => Project::orderBy('order', 'asc')->get(),
            'products'     => Product::query()
                ->select(['id', 'name', 'title', 'description','features','tech_stack','pricing', 'is_active', 'sort_order'])
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(function ($product) {
                    $product->image = $product->getFirstMediaUrl('product_image');
                    $techStack = is_array($product->tech_stack)
                        ? $product->tech_stack
                        : json_decode($product->tech_stack, true);

                    $product->tech_stack = [
                        'architecture' => $techStack['architecture'] ?? '',
                        'frontend'     => $techStack['frontend'] ?? '',
                        'middleware'   => $techStack['middleware'] ?? '',
                        'database'     => $techStack['database'] ?? $techStack['Database'] ?? '',
                    ];

                    return $product;
                }),
            'testimonials' => Testimonial::orderBy('order', 'asc')->get(),   // ← fixed + explicit asc
            'settings'     => Setting::first(),
        ]);
    }

    public function contact()
    {
        $menus = [
            ['id' => 'home',      'label' => 'Home', 'route' => 'home'],
            ['id' => 'about',     'label' => 'About Us'],
            ['id' => 'services',  'label' => 'Services'],
            ['id' => 'products',  'label' => 'Products'],
            ['id' => 'contact',   'label' => 'Contact Us', 'route' => 'contact'],
        ];

        // Define the techStack array
        $techStack = [
            ['name' => '.NET', 'icon' => '/images/tech/dotnet.svg', 'color' => 'from-purple-500 to-pink-500'],
            ['name' => 'Java', 'icon' => '/images/tech/java.svg', 'color' => 'from-red-500 to-orange-500'],
            ['name' => 'PHP', 'icon' => '/images/tech/php.svg', 'color' => 'from-blue-500 to-indigo-500'],
            ['name' => 'React', 'icon' => '/images/tech/react.svg', 'color' => 'from-cyan-500 to-blue-500'],
            ['name' => 'MySQL', 'icon' => '/images/tech/mysql.svg', 'color' => 'from-blue-600 to-cyan-600'],
            ['name' => 'Oracle', 'icon' => '/images/tech/oracle.svg', 'color' => 'from-red-600 to-orange-600'],
            ['name' => 'Blockchain', 'icon' => '/images/tech/blockchain.svg', 'color' => 'from-green-500 to-emerald-500'],
            ['name' => 'PostgreSQL', 'icon' => '/images/tech/postgresql.svg', 'color' => 'from-blue-700 to-indigo-700'],
            ['name' => 'Python', 'icon' => '/images/tech/python.svg', 'color' => 'from-blue-400 to-cyan-400'],
            ['name' => 'JavaScript', 'icon' => '/images/tech/javascript.svg', 'color' => 'from-yellow-400 to-yellow-600'],
            ['name' => 'Node.js', 'icon' => '/images/tech/nodejs.svg', 'color' => 'from-green-600 to-emerald-600'],
            ['name' => 'AWS', 'icon' => '/images/tech/aws.svg', 'color' => 'from-orange-500 to-yellow-500'],
        ];

        return Inertia::render('Public/Contact', [
            'menuItems' => $menus,
            'techStack' => $techStack,
            'services' => Service::orderBy('order')->get(),
            'projects' => Project::orderBy('order')->get(),
            'testimonials' => Testimonial::orderBy('order')->get(),
            'settings' => Setting::first(),
        ]);
    }
}
