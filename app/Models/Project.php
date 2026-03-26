<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @method static updateOrCreate(array $array, array $array1)
 */
class Project extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'logo',
        'description',
        'category',
        'technologies',
        'gradient',
        'image_color',
        'project_link',
        'accent',
        'slug',
        'order',
    ];

    protected $casts = [
        'technologies' => 'array', // or 'json' if you prefer
        'order' => 'integer',
        'completion_date' => 'date',
    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('project_thumbnail') // single
        ->singleFile();

        $this->addMediaCollection('project_screenshots'); // multiple
    }

}
