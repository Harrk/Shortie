<?php

use App\Enums\Role;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.allowUserRegistration', true);
        $this->migrator->add('general.defaultUserRole', Role::USER);
    }
};
