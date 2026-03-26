<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'logo'        => 'nullable|string|max:10', // ✅ ADD

            'description' => 'nullable|string',
            'category'    => 'nullable|string',

            'technologies'   => 'nullable|array',
            'technologies.*' => 'string|max:200',

            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'screenshots'   => 'nullable|array',
            'screenshots.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',

            'project_link' => 'nullable|url',
            'accent'       => 'nullable|string|max:20',
            'completion_date'  => 'nullable|string|max:20',

            'order'  => 'integer|min:0',
        ];
    }
}
