<?php

use App\Enums\Role;
use App\Models\User;

describe('Admin can manage settings', function () {
    test('Edit settings', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $response = $this->get(route('settings.edit'));
        $response->assertStatus(200);
    });

    test('Update settings', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $response = $this->post(route('settings.update'));
        $response->assertStatus(302);
    });
});

describe('Non-admins cannot manage settings', function () {
    test('Edit settings', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->get(route('settings.edit'));
        $response->assertStatus(403);
    })->with([Role::USER, Role::SUPER_USER]);

    test('Update settings', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->post(route('settings.update'));
        $response->assertStatus(403);
    })->with([Role::USER, Role::SUPER_USER]);
});
