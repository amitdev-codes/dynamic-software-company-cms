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
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo_light')->singleFile();
        $this->addMediaCollection('logo_dark')->singleFile();
        $this->addMediaCollection('favicon')->singleFile();
        $this->addMediaCollection('og_image')->singleFile();
    }
}
