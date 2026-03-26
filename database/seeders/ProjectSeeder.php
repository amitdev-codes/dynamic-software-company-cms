<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'CloudPOS System',
                'logo'=> '🛒',
                'category' => 'Retail Tech',
                'description' => 'A blazing-fast point-of-sale platform built for modern retail. Handles inventory, billing, and analytics — all in real time.',
                'technologies' => ['Laravel', 'React', 'MySQL'],
                'accent' => '#3b82f6',
                'slug' => 'cloudpos-system',
                'completion_date' => '2013-01-15',
                'order' => 1,
            ],
            [
                'title' => 'MediTrack Pro',
                'logo'=> '🏥',
                'category' => 'Healthcare',
                'description' => 'End-to-end patient management system for clinics and hospitals. Streamlines appointments, records, and billing workflows.',
                'technologies' => ['Node.js', 'Vue', 'PostgreSQL'],
                'accent' => '#8b5cf6',
                'slug' => 'meditrack-pro',
                'completion_date' => '2014-10-26',
                'order' => 2,
            ],
            [
                'title' => 'EduNest LMS',
                'logo'=>'🎓',
                'category' => 'Education',
                'description' => 'A feature-rich learning management system with live classes, assessments, and progress tracking for institutions of any size.',
                'technologies' => ['Laravel', 'Inertia', 'Redis'],
                'accent' => '#06b6d4',
                'slug' => 'edunest-lms',
                'completion_date' => '2020-11-23',
                'order' => 3,
            ],
            [
                'title' => 'FinVault Analytics',
                'logo'=> '📊',
                'category' => 'FinTech',
                'description' => 'Real-time financial analytics dashboard with predictive insights, portfolio tracking, and regulatory compliance tools.',
                'technologies' => ['Python', 'React', 'ClickHouse'],
                'accent' => '#f59e0b',
                'slug' => 'finvault-analytics',
                'completion_date' => '2025-02-25',
                'order' => 4,
            ],
            [
                'title' => 'LogiFlow TMS',
                'logo'=> '🚚',
                'category' => 'Logistics',
                'description' => 'Smart transport management system for fleet tracking, route optimization, and automated dispatch across supply chains.',
                'technologies' => ['Laravel', 'Vue', 'Redis'],
                'accent' => '#10b981',
                'slug' => 'logiflow-tms',
                'completion_date' => '2019-05-15',
                'order' => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                [
                    ...$project,
                    'gradient' => null,
                    'image_color' => null,
                    'project_link' => null,
                ]
            );
        }
    }
}
