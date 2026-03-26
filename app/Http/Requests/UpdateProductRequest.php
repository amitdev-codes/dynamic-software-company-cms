<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => 'required|string|max:100|unique:products,name,'.$this->product->id,
            'slug' => 'nullable|string|max:255|unique:products,slug,'.$this->product->id,
            'title'       => 'required|string|max:150',
            'description' => 'nullable|string',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:200',
            'tech_stack'  => 'nullable|array',
            'tech_stack.*'  => 'nullable|array',
            'pricing'     => 'nullable|string|max:60',
            'image' => 'nullable|image|max:2048',  // or image file validation if uploading
            'is_active'   => 'boolean',
            'sort_order'  => 'integer|min:0',
        ];
    }
}
