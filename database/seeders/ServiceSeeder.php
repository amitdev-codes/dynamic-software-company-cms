<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [

            // ── Default / Main Services (6 cards in grid) ──
            [
                'title'       => 'IT Consulting',
                'description' => 'Consult with us for appropriate IT implementations of your valued organization.',
                'image'       => '/image/consult.png',
                'category'    => 'default',
                'order'       => 1,
            ],
            [
                'title'       => 'Software Development',
                'description' => 'We can develop customized software solutions to solve specific problems of your organization.',
                'image'       => '/image/code.png',
                'category'    => 'default',
                'order'       => 2,
            ],
            [
                'title'       => 'Document Archive',
                'description' => 'Digitize and archive your organizational documents to a safe location.',
                'image'       => '/image/document.png',
                'category'    => 'default',
                'order'       => 3,
            ],
            [
                'title'       => 'Research and Development',
                'description' => 'We have a team to conduct research in complex problems and come up with evidence-based recommendations.',
                'image'       => '/image/research.png',
                'category'    => 'default',
                'order'       => 4,
            ],
            [
                'title'       => 'Digital Literacy',
                'description' => 'We have been conducting trainings on digital literacy to help people with handling digital platforms better way.',
                'image'       => '/image/digital.png',
                'category'    => 'default',
                'order'       => 5,
            ],
            [
                'title'       => 'Support and Maintenance',
                'description' => 'We provide specific services in support and maintenance of software solutions.',
                'image'       => '/image/software.png',
                'category'    => 'default',
                'order'       => 6,
            ],

            // ── Comprehensive / Proficiency Services (3 featured cards) ──
            [
                'title'       => 'Financial Management Solution',
                'description' => 'We can help you improve your financial management system with an implementation of ACA. Explore about ACA.',
                'image'       => '/image/payment.png',
                'category'    => 'comprehensive',
                'order'       => 1,
            ],
            [
                'title'       => 'Human Resource Management (HRM) Solution',
                'description' => 'HRM comprises of several key functions aimed at effectively managing an organization\'s workforce. You can transfer this load to HumlaHR and ease your life. Explore about HumlaHR.',
                'image'       => '/image/hrmis.png',
                'category'    => 'comprehensive',
                'order'       => 2,
            ],
            [
                'title'       => 'Design and estimate of Water Supply Scheme',
                'description' => 'Hundreds of Engineers have already benefitted from DEWSStool to design and estimate the water supply schemes. Explore about DEWSS.',
                'image'       => '/image/document.png',
                'category'    => 'comprehensive',
                'order'       => 3,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
