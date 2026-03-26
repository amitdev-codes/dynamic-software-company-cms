<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @method static create(mixed $validated)
 */
class Service extends Model implements HasMedia
{

    use InteractsWithMedia;
    protected $fillable = [
        'title',
        'description',
        'icon',
        'image',
        'category',
        'features',
        'gradient',
        'order',
    ];


    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('service_image')
            ->singleFile(); // replaces old image automatically
    }
}
