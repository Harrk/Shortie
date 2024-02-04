<?php

namespace App\Console\Commands;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Console\Command;

class CreateAdmin extends Command
{
    protected $signature = 'app:create-admin';

    protected $description = 'Create a new admin user';

    public function handle()
    {
        User::create([
            'name' => $this->ask('Name'),
            'email' => $this->ask('Email'),
            'password' => $this->secret('Password'),
            'role' => Role::ADMIN,
        ]);

        $this->info('Admin user has been created.');
    }
}
