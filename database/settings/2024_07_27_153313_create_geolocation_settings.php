<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.enableGeolocation', false);
    }

    public function down(): void
    {
        $this->migrator->delete('general.enableGeolocation');
    }
};
