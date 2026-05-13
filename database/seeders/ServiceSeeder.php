<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Icons from: react-icons (FiIcons, BiIcons, MdIcons, HiIcons, etc.)
     * Usage in React: import { IconName } from 'react-icons/fi' (or other libraries)
     */
    public function run(): void
    {
        $services = [
            // ============================================
            // ?? DEFAULT / MAIN SERVICES (6 cards)
            // ============================================
            [
                'title'       => 'IT Consulting',
                'description' => 'Consult with us for appropriate IT implementations of your valued organization.',
                'icon'        => 'FiAward',           // Feather Icons - Award icon
                'icon_color'  => '#3B82F6',           // Blue
                'image'       => '/image/consult.png',
                'category'    => 'default',
                'order'       => 1,
            ],
            [
                'title'       => 'Software Development',
                'description' => 'We can develop customized software solutions to solve specific problems of your organization.',
                'icon'        => 'BiCodeBlock',       // Boxicons - Code icon
                'icon_color'  => '#8B5CF6',           // Purple
                'image'       => '/image/code.png',
                'category'    => 'default',
                'order'       => 2,
            ],
            [
                'title'       => 'Document Archive',
                'description' => 'Digitize and archive your organizational documents to a safe location.',
                'icon'        => 'MdFolder',          // Material Design - Folder icon
                'icon_color'  => '#F59E0B',           // Amber/Orange
                'image'       => '/image/document.png',
                'category'    => 'default',
                'order'       => 3,
            ],
            [
                'title'       => 'Research and Development',
                'description' => 'We have a team to conduct research in complex problems and come up with evidence-based recommendations.',
                'icon'        => 'HiBeaker',          // Heroicons - Beaker/Lab icon
                'icon_color'  => '#EC4899',           // Pink
                'image'       => '/image/research.png',
                'category'    => 'default',
                'order'       => 4,
            ],
            [
                'title'       => 'Digital Literacy',
                'description' => 'We have been conducting trainings on digital literacy to help people with handling digital platforms in a better way.',
                'icon'        => 'MdSchool',          // Material Design - Learning icon
                'icon_color'  => '#10B981',           // Emerald/Green
                'image'       => '/image/digital.png',
                'category'    => 'default',
                'order'       => 5,
            ],
            [
                'title'       => 'Support and Maintenance',
                'description' => 'We provide specific services in support and maintenance of software solutions.',
                'icon'        => 'BiWrench',          // Boxicons - Tools/Wrench icon
                'icon_color'  => '#06B6D4',           // Cyan
                'image'       => '/image/software.png',
                'category'    => 'default',
                'order'       => 6,
            ],

            // ============================================
            // ?? COMPREHENSIVE / PROFICIENCY SERVICES (3)
            // ============================================
            [
                'title'       => 'Financial Management Solution',
                'description' => 'We can help you improve your financial management system with an implementation of ACA. Explore about ACA.',
                'icon'        => 'MdAttachMoney',      // Material Design - Money/Payment icon
                'icon_color'  => '#14B8A6',           // Teal
                'image'       => '/image/payment.png',
                'category'    => 'comprehensive',
                'order'       => 1,
            ],
            [
                'title'       => 'Human Resource Management (HRM) Solution',
                'description' => 'HRM comprises of several key functions aimed at effectively managing an organization\'s workforce. You can transfer this load to HumlaHR and ease your life. Explore about HumlaHR.',
                'icon'        => 'BiPeople',          // Boxicons - People/Users icon
                'icon_color'  => '#F97316',           // Orange
                'image'       => '/image/hrmis.png',
                'category'    => 'comprehensive',
                'order'       => 2,
            ],
            [
                'title'       => 'Design and Estimate of Water Supply Scheme',
                'description' => 'Hundreds of Engineers have already benefitted from DEWSStool to design and estimate the water supply schemes. Explore about DEWSS.',
                'icon'        => 'MdWaterDrop',       // Material Design - Water Drop icon
                'icon_color'  => '#0EA5E9',           // Sky Blue
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
