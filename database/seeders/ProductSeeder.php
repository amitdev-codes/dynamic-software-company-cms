<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // 1. Original ACA (kept first)
            [
                'name'        => 'ACA',
                'title'       => 'Advanced Corporate Accounting',
                'description' => "The main objective of ACA is to provide comprehensive accounting and reporting services.\nIt aims to supply NFRS standard reports for organizations of all sizes, from small to large.\nThe seamless information flow between different hierarchical levels within an organization is one of its key features.",
                'features'    => [
                    'You can perform accounting transactions at levels 3, 4 and 5.',
                    'Generate NFRS compliant financial statements automatically.',
                    'Multi-level organizational hierarchy support with role-based access.',
                    'Real-time reporting dashboard for management.',
                ],
                'tech_stack'  => [
                    'architecture' => '3 tiers',
                    'frontend'     => 'Angular, CSS, HTML',
                    'middleware'   => 'Java Spring Boot',
                    'database'     => 'MariaDB',
                ],
                'pricing'     => 'Free',
                'sort_order'  => 1,
                'image'       => '/image/ACA.png',
            ],

            // 2. New Product
            [
                'name'        => 'INVENTO',
                'title'       => 'Smart Inventory Management',
                'description' => "INVENTO helps businesses efficiently track, manage, and optimize their inventory in real-time.\nIt reduces stockouts, prevents overstocking, and integrates seamlessly with sales and accounting systems.",
                'features'    => [
                    'Real-time inventory tracking across multiple warehouses.',
                    'Automated reordering with smart alerts.',
                    'Barcode & QR code scanning support.',
                    'Demand forecasting using historical data.',
                    'Seamless integration with e-commerce platforms.',
                ],
                'tech_stack'  => [
                    'architecture' => 'Microservices',
                    'frontend'     => 'React, Tailwind CSS',
                    'middleware'   => 'Node.js, Express',
                    'database'     => 'PostgreSQL',
                ],
                'pricing'     => 'Starting at $29/mo',
                'sort_order'  => 2,
                'image'       => '/image/appdig.png',
            ],

            // 3. New Product
            [
                'name'        => 'PAYROLLX',
                'title'       => 'Automated Payroll & HR',
                'description' => "PAYROLLX simplifies payroll processing, tax compliance, and employee management for organizations of any size.\nIt ensures accurate and timely salary disbursements with full compliance.",
                'features'    => [
                    'Automated salary calculation and payslip generation.',
                    'Tax deduction and statutory compliance.',
                    'Employee self-service portal.',
                    'Leave management and attendance tracking.',
                    'Direct bank transfer integration.',
                ],
                'tech_stack'  => [
                    'architecture' => '3 tiers',
                    'frontend'     => 'Vue.js, Bootstrap',
                    'middleware'   => 'Laravel',
                    'database'     => 'MySQL',
                ],
                'pricing'     => 'Free for first 10 employees',
                'sort_order'  => 3,
                'image'       => '/image/code.png',
            ],

            // 4. New Product
            [
                'name'        => 'FINREPORT',
                'title'       => 'Financial Reporting & Analytics',
                'description' => "FINREPORT provides powerful financial insights with customizable dashboards and advanced analytics.\nPerfect for CFOs and finance teams who need deep visibility into business performance.",
                'features'    => [
                    'Interactive financial dashboards and KPIs.',
                    'Custom report builder with drag & drop.',
                    'Budget vs Actual comparison.',
                    'Multi-currency and multi-company support.',
                    'Export to PDF, Excel, and CSV.',
                ],
                'tech_stack'  => [
                    'architecture' => 'Serverless',
                    'frontend'     => 'React, Chart.js',
                    'middleware'   => 'Python FastAPI',
                    'database'     => 'PostgreSQL + Redis',
                ],
                'pricing'     => 'Premium',
                'sort_order'  => 4,
                'image'       => '/image/digital.png',
            ],

            // 5. New Product
            [
                'name'        => 'PROJECTLY',
                'title'       => 'Project Management & Billing',
                'description' => "PROJECTLY helps teams plan, track, and bill projects efficiently.\nIt combines task management, time tracking, and client invoicing in one powerful platform.",
                'features'    => [
                    'Kanban and Gantt chart views.',
                    'Time tracking with automatic billing.',
                    'Client portal for real-time updates.',
                    'Resource allocation and workload balancing.',
                    'Invoice generation from tracked hours.',
                ],
                'tech_stack'  => [
                    'architecture' => 'Monolithic + API',
                    'frontend'     => 'Next.js, Tailwind',
                    'middleware'   => 'Django',
                    'database'     => 'PostgreSQL',
                ],
                'pricing'     => 'Free',
                'sort_order'  => 5,
                'image'       => '/image/finance1.png',
            ],

            // 6. New Product
            [
                'name'        => 'EXPENSELY',
                'title'       => 'Expense Management System',
                'description' => "EXPENSELY streamlines expense tracking, approval workflows, and reimbursement processes.\nIt helps organizations control spending while giving employees a smooth experience.",
                'features'    => [
                    'Mobile app for receipt scanning and submission.',
                    'Multi-level approval workflow.',
                    'Policy enforcement and violation alerts.',
                    'Integration with accounting software.',
                    'Detailed expense analytics and reports.',
                ],
                'tech_stack'  => [
                    'architecture' => '3 tiers',
                    'frontend'     => 'Flutter (Mobile + Web)',
                    'middleware'   => 'Node.js, NestJS',
                    'database'     => 'MongoDB',
                ],
                'pricing'     => 'Starting at $15/user/mo',
                'sort_order'  => 6,
                'image'       => '/image/document.png',
            ],
        ];

        foreach ($products as $data) {
            Product::create($data);
        }
    }
}
