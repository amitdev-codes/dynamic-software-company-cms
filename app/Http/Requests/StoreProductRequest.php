<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:100|unique:products,name',
            'title'       => 'required|string|max:150',
            'description' => 'nullable|string',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:200',
            'tech_stack'  => 'nullable|array',
            'pricing'     => 'nullable|string|max:60',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // or image file validation if uploading
            'slug'        => 'nullable|string|max:255|unique:products,slug',
            'is_active'   => 'boolean',
            'sort_order'  => 'integer|min:0',
        ];
    }
}
