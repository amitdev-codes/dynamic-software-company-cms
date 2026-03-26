<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @method static create(array $data)
 */
class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'title',
        'description',
        'features',
        'tech_stack',
        'pricing',
        'image',
        'slug',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'features' => 'array',       // JSON array
        'tech_stack' => 'array',     // JSON object
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
    ];

    // Optional – nice accessor
    public function getFrontendTechAttribute(): ?string
    {
        return $this->tech_stack['frontend'] ?? null;
    }

    // Optional – generate slug from name + title if not provided
    protected static function booted()
    {
        static::creating(function (Product $product) {
            if (!$product->slug) {
                $product->slug = \Str::slug($product->name . ' ' . $product->title);
            }
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('product_image')
            ->singleFile(); // replaces old image automatically
    }
}
