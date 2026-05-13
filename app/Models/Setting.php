<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Setting extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'company_name',
        'company_slogan',
        'tagline',
        'short_description',
        'description',
        'founded_year',
        'projects_delivered',
        'client_satisfaction',
        'clients_count',
        'years_of_experience',

        'logo_light',
        'logo_dark',
        'favicon',
        'primary_color',

        'meta_title',
        'meta_description',
        'meta_keywords',
        'email',
        'support_email',
        'phone',
        'whatsapp',
        'address',
        'city',
        'country',
        'business_hours',
        'social_links',
        'total_visits',
    ];

    protected $casts = [
        'social_links' => 'array',
        'total_visits' => 'integer',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo_light')->singleFile();
        $this->addMediaCollection('logo_dark')->singleFile();
        $this->addMediaCollection('favicon')->singleFile();
        $this->addMediaCollection('og_image')->singleFile();
    }
    public static function incrementVisits(): void
    {
        // We assume there's only one row in settings (common pattern)
        $setting = self::first();

        if ($setting) {
            $setting->increment('total_visits');
        } else {
            // Fallback: create the first row if settings table is empty
            self::create([
                'company_name' => 'Your Company',
                'total_visits' => 1,
                // add other defaults if needed
            ]);
        }
    }
}
