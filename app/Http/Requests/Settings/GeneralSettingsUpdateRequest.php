<?php

namespace App\Http\Requests\Settings;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GeneralSettingsUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'allowUserRegistration' => 'required|boolean',
            'defaultUserRole' => [
                'required',
                Rule::in(Role::cases()),
            ],
        ];
    }
}
