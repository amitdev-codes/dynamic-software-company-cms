<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:150',
            'logo'        => 'nullable|string|max:10', // emoji or short text
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',

            'technologies'   => 'nullable|array',
            'technologies.*' => 'string|max:200',

            // media
            'thumbnail'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'screenshots'    => 'nullable|array',
            'screenshots.*'  => 'image|mimes:jpg,jpeg,png,webp|max:2048',

            'project_link' => 'nullable|url',
            'accent'       => 'nullable|string|max:20', // #hex
            'gradient'     => 'nullable|string|max:60',
            'image_color'  => 'nullable|string|max:20',
            'completion_date' => 'nullable|date',

            'slug' => 'nullable|string|max:150',
            'order' => 'integer|min:0',
        ];
    }
}
