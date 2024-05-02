<?php

namespace App\Http\Requests\ShortUrl;

use Illuminate\Foundation\Http\FormRequest;

class ShortUrlIndexRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'filters' => 'array',
            'sort' => 'array',
            'sort.field' => 'nullable|string|in:created_at,clicks',
            'sort.order' => 'nullable|string|in:desc,asc'
        ];
    }
}
