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
            [
                'name'        => 'ACA',
                'title'       => 'E-Commerce Platform',
                'description' => "The main objective of ACA is to provide comprehensive accounting and reporting services.\nIt aims to supply NFRS standard reports for organizations of all sizes, from small to large.\nThe seamless information flow between different hierarchical levels within an organization is one of its key features.",
                'features'    => [
                    'You can perform accounting transactions at levels 3,4 and 5.',
                    // add more bullet points if you want
                ],
                'tech_stack'  => [
                    'architecture' => '3 tiers',
                    'frontend'     => 'Angular, CSS HTML',
                    'middleware'   => 'Java Spring boot',
                    'database'     => 'MariaDB',
                ],
                'pricing'     => 'Free',
                'sort_order'  => 1,
                'image'       => '/image/products1.png',   // or null if you want placeholder
            ],

        ];

        foreach ($products as $data) {
            Product::create($data);
        }
    }
}
