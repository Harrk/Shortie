<?php

namespace App\Enums;

enum Role: string
{
    /**
     * Access everything.
     */
    case ADMIN = 'Admin';

    /**
     * Access all Short URLs (including other users). No access to settings.
     */
    case SUPER_USER = 'Super User';

    /**
     * Can only manage their own Short URLs. No access to settings.
     */
    case USER = 'User';
}
