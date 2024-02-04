<?php

namespace App\Policies;

use App\Models\User;

class SettingsPolicy
{
    public function update(User $user)
    {
        return $user->isAdmin();
    }
}
