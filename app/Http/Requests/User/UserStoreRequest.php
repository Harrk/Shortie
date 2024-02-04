<?php

namespace App\Http\Requests\User;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('users')
                    ->ignore($this->input('id'))
                    ->where('email', $this->input('email')),
            ],
            'password' => [
                'required',
                Password::defaults(),
            ],
            'role' => [
                'sometimes',
                Rule::in(Role::cases()),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('role') && Auth::user()->role !== Role::ADMIN) {
            $this->getInputSource()->remove('role');
        }
    }
}
