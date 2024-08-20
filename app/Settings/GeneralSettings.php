<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public bool $allowUserRegistration;

    public string $defaultUserRole;

    public bool $enableGeolocation;

    public static function group(): string
    {
        return 'general';
    }
}
