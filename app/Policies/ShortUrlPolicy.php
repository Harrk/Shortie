<?php

namespace App\Policies;

use App\Models\ShortUrl;
use App\Models\User;

class ShortUrlPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, shortUrl $shortUrl): bool
    {
        return $shortUrl->user_id === $user->id || $user->isSuper();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, shortUrl $shortUrl): bool
    {
        return $shortUrl->user_id === $user->id || $user->isSuper();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, shortUrl $shortUrl): bool
    {
        return $shortUrl->user_id === $user->id || $user->isSuper();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, shortUrl $shortUrl): bool
    {
        return $shortUrl->user_id === $user->id || $user->isSuper();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, shortUrl $shortUrl): bool
    {
        return $shortUrl->user_id === $user->id || $user->isSuper();
    }
}
