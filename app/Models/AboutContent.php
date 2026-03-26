<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $fillable = [
        'mission_text',
        'years_experience',
        'global_clients',
        'other_stats',
        'image_path',
    ];

    // Optional: if you want to cast JSON field automatically
    protected $casts = [
        'other_stats' => 'array',   // or 'json' if you prefer
    ];
}
