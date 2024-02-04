<?php

namespace App\Http\Requests\User;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserIndexRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'filters.role' => [
                'nullable',
                Rule::in(Role::cases()),
            ],
        ];
    }
}
