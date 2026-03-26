<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();

            // ── General ───────────────────────────────────────────────
            $table->string('company_name')->nullable();
            $table->string('company_slogan')->nullable();
            $table->string('tagline')->nullable();
            $table->text('short_description')->nullable();
            $table->text('description')->nullable();               // longer "About us" style text
            $table->string('founded_year')->nullable();

            $table->string('projects_delivered')->nullable()->default(0);
            $table->string('client_satisfaction')->nullable();
            $table->string('clients_count')->nullable()->default(0);
            $table->string('years_of_experience')->nullable();
            //brandings
            $table->string('logo_light')->nullable();
            $table->string('logo_dark')->nullable();
            $table->string('favicon')->nullable();
            $table->string('primary_color')->nullable();

            // ── Branding (you already handle files separately – keep IDs or paths if needed)
            // logo_light, logo_dark, favicon → usually stored in media table or as paths
            // primary_color → can stay in DB or move to theme config

            // ── SEO – Basic + Advanced ───────────────────────────────
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();           // comma separated or array in backend

            // Advanced / Technical SEO
            $table->boolean('indexing_enabled')->default(true);    // site-wide noindex toggle
            $table->string('robots_txt_content')->nullable();      // custom robots.txt content
            $table->string('canonical_url')->nullable();           // default canonical for homepage
            $table->string('google_site_verification')->nullable(); // Google Search Console code
            $table->string('bing_site_verification')->nullable();
            $table->string('yandex_verification')->nullable();
            $table->string('google_analytics_id')->nullable();     // GA4 → G-XXXXXXXXXX
            $table->string('google_tag_manager_id')->nullable();   // GTM-XXXXXXX
            $table->string('facebook_pixel_id')->nullable();
            $table->json('extra_meta_tags')->nullable();           // flexible: [{"name":"theme-color","content":"#000"}]

            // ── Open Graph / Social Sharing Defaults (global fallback) ──
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();                // path or URL
            $table->string('og_type')->default('website');

            // ── Contact ───────────────────────────────────────────────
            $table->string('email')->nullable();
            $table->string('support_email')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();

            // ── Location / Business ──────────────────────────────────
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('business_hours')->nullable();          // e.g. "Mon-Fri 09:00-18:00" or JSON for multi-day

            // Precise Geo Location (for Google Maps pin, LocalBusiness schema, etc.)
            $table->decimal('latitude', 10, 8)->nullable();        // e.g. 27.71724500
            $table->decimal('longitude', 11, 8)->nullable();       // e.g. 85.32396100
            $table->string('google_place_id')->nullable();         // optional – Place ID from Google
            $table->string('google_maps_embed_url')->nullable();   // optional – full embed iframe src

            // ── Social Links (flexible JSON – easy to extend) ────────
            $table->json('social_links')->nullable();              // {"facebook":"https://...","youtube":"...", ...}

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
