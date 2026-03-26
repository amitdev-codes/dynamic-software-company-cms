<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('settings')->updateOrInsert(
            ['id' => 1], // single global settings row
            [
                // ── General ───────────────────────────────────────────────
                'company_name' => 'CloudCom',
                'company_slogan' => 'Technology Partner',
                'tagline' => 'Simplifying IT services with innovative, cost-effective solutions.Your trusted partner for digital transformation.',
                'short_description' => 'Cloudcom Software is a full-cycle software development company specializing in web, mobile, and enterprise applications.',
                'description' => 'We are a passionate team of developers and designers delivering high-quality web and mobile applications using modern technologies including React, Laravel, Node.js, Flutter, Java, .NET, PHP, and more. Located in Anamnagar, Kathmandu, Nepal – we help businesses transform ideas into powerful digital products with innovative and reliable solutions.',
                'founded_year' => '2012',
                'projects_delivered' => '500 +',
                'client_satisfaction' => '98 %',
                'clients_count' => '50+',
                'years_of_experience' => '12+',

                'logo_light' => 'image/logo.png',
                'logo_dark' => 'image/logo.png',
                'primary_color' => 'blue',
                'favicon' => 'image/logo.png',

                // ── SEO – Basic + Advanced ───────────────────────────────
                'meta_title' => 'Cloudcom Software | Web & Mobile App Development Company in Kathmandu, Nepal',
                'meta_description' => 'Cloudcom Software – Top web development, mobile app development & custom software solutions in Kathmandu, Nepal. Expert team in React, Laravel, Flutter, Java, .NET & PHP. Transform your ideas into reality. Contact us today!',
                'meta_keywords' => 'web development Nepal, mobile app development Kathmandu, software company Nepal, custom software Kathmandu, React development Nepal, Laravel development, Flutter app Nepal, Java development, .NET development, PHP development Kathmandu',

                // Advanced SEO (realistic defaults)
                'indexing_enabled' => true,
                'robots_txt_content' => "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /login\nSitemap: https://yourdomain.com/sitemap.xml",
                'canonical_url' => 'https://cloudcomsoftware.com', // or your actual domain
                'google_site_verification' => '', // paste real code later
                'bing_site_verification' => '',
                'google_analytics_id' => 'G-XXXXXXXXXX', // placeholder – replace with real GA4 ID
                'google_tag_manager_id' => 'GTM-XXXXXXX',  // placeholder
                'extra_meta_tags' => json_encode([
                    ['name' => 'theme-color', 'content' => '#4f46e5'],
                    ['name' => 'author', 'content' => 'Cloudcom Software'],
                ]),

                // ── Open Graph / Social Sharing Defaults ─────────────────
                'og_title' => 'Cloudcom Software – Innovative Web & Mobile Solutions in Nepal',
                'og_description' => 'Leading software development company in Kathmandu offering custom web, mobile apps, and enterprise solutions using cutting-edge technologies.',
                'og_image' => '/images/og-cloudcom.jpg', // path to a default OG image (upload one)
                'og_type' => 'website',

                // ── Contact ───────────────────────────────────────────────
                'email' => 'info@cloudcomsoftware.com',
                'support_email' => 'support@cloudcomsoftware.com',
                'phone' => '+977 980-1234567',
                'whatsapp' => '+977 980-1234567',

                // ── Location ──────────────────────────────────────────────
                'address' => 'Anamnagar-32, Kathmandu',
                'city' => 'Kathmandu',
                'country' => 'Nepal',
                'business_hours' => 'Sun-Fri: 10:00 AM - 6:00 PM',

                // Geo (approximate for Anamnagar area)
                'latitude' => 27.6944,
                'longitude' => 85.3150,
                'google_place_id' => '', // fill later if you claim GMB
                'google_maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5... (paste real embed)',

                // ── Social Links ──────────────────────────────────────────
                'social_links' => json_encode([
                    'facebook' => 'https://facebook.com/cloudcomsoftware',
                    'twitter' => 'https://x.com/cloudcomnp',
                    'linkedin' => 'https://linkedin.com/company/cloudcom-software',
                    'github' => 'https://github.com/cloudcom-software',
                    'instagram' => 'https://instagram.com/cloudcomsoftware',
                    'youtube' => 'https://youtube.com/@cloudcomsoftware',
                ]),

                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
