<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Aarati Bista',
                'role' => 'Project Manager (SPSP/UNDP)',
                'content' => 'The communication of the team was excellent and their behaviour professional.
                              The performance of the assignment, which was to deliver the Document Management System for
                              NHRC, was adequate. They maintained clear and consistent updates throughout the project.
                              Their professionalism was evident in their prompt responses to inquiries and their ability
                              to address any challenges that arose.',
                'avatar_color' => 'bg-blue-100 text-blue-600',
                'rating' => 5,
            ],
            [
                'name' => 'Chhabi Raj Pokhrel',
                'role' => 'Chief Executive Officer (Provincial Infrastructure Development Authority)',
                'content' => 'The Company delivered the ERP-sized office
                                applications efficiently, ensuring seamless
                                integration and minimal disruption to
                                ongoing operations. Their team worked
                                diligently to customize the software to
                                meet our specific business needs, providing
                                comprehensive training and support
                                throughout the implementation process.',
                'avatar_color' => 'bg-green-100 text-green-600',
                'rating' => 5,
            ],
            [
                'name' => 'Shova Kumari Poudel',
                'role' => 'Managing Director (BFI)',
                'content' => 'Our company has been utilizing services
                                from Cloud Com for the past five years,
                                primarily in research and development
                                assignments. The quality-of-service
                                delivery has consistently been excellent,
                                exceeding our expectations in both
                                performance and reliability.',
                'avatar_color' => 'bg-purple-100 text-purple-600',
                'rating' => 5,
            ],
            [
                'name' => 'Dharmaraj Budhathoki',
                'role' => 'Managing Director (Dryice Solutions)',
                'content' => 'We receive a range of services from Cloud
                                Com, including software project development
                                and management. The company has
                                consistently provided dedicated services
                                and has a proven track record of resolving
                                all client- and domain-related issues.
                                Their strong accountability and commitment
                                to delivering on promises are key factors
                                in our satisfaction.',
                'avatar_color' => 'bg-purple-100 text-purple-600',
                'rating' => 5,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
