<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@cloudcomlab.com',
            'password' => Hash::make('123456'), // Always hash passwords in seeders
        ]);

        // 2. Create 9 more random users to reach your total of 10
        User::factory(9)->create();

        $this->call([
            ServiceSeeder::class,
            AboutContentSeeder::class,
            ProjectSeeder::class,
            ProductSeeder::class,
            TestimonialSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
