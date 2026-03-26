<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'role',
        'content',
        'avatar_color',
        'avatar_image',
        'rating',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'integer',
        'order'  => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Default attribute values
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'rating' => 5,
        'order'  => 0,
        'avatar_color' => null,
        'avatar_image' => null,
    ];

    // Optional: Accessor for convenient display
    public function getAvatarAttribute(): ?string
    {
        return $this->avatar_image ?? $this->avatar_color;
    }

    // Optional: Scope for ordered list (most common use-case)
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('id');
    }
}
