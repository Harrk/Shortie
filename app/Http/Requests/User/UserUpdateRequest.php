<?php

namespace App\Http\Requests\User;

use Illuminate\Validation\Rules\Password;

class UserUpdateRequest extends UserStoreRequest
{
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'password' => [
                'sometimes',
                Password::defaults(),
            ],
        ]);
    }

    protected function prepareForValidation()
    {
        parent::prepareForValidation();

        // Remove password from keys if blank.
        if ($this->has('password') && ! $this->input('password')) {
            $this->getInputSource()->remove('password');
        }
    }
}
