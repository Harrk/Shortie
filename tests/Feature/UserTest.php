<?php

use App\Enums\Role;
use App\Models\User;

describe('User can manage own profile', function () {
    test('Edit profile', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->get(route('user.edit', $user));
        $response->assertStatus(200);
    })->with(Role::cases());

    test('Update profile', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $user->email = 'bob@example.com';

        $response = $this->put(route('user.update', $user), $user->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'bob@example.com',
        ]);
    })->with(Role::cases());

    test('Cannot update role', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $data = $user->toArray();
        $data['role'] = Role::ADMIN->value;

        $response = $this->put(route('user.update', $user), $data);
        $response->assertStatus(302);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'role' => $role,
        ]);
    })->with([Role::SUPER_USER, Role::USER]);

    test('Admin can update role', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $data = $user->toArray();
        $data['role'] = Role::USER->value;

        $response = $this->put(route('user.update', $user), $data);
        $response->assertStatus(302);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'role' => Role::USER->value,
        ]);
    });
});

describe('Non-admins cannot manage users', function () {
    test('List users', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->get(route('user.index'));
        $response->assertStatus(403);
    })->with([Role::SUPER_USER, Role::USER]);

    test('Edit user', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('user.edit', $user2));
        $response->assertStatus(403);
    })->with([Role::SUPER_USER, Role::USER]);

    test('Create user', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->get(route('user.create'));
        $response->assertStatus(403);
    })->with([Role::SUPER_USER, Role::USER]);

    test('Store user', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $user2 = User::factory()->make();
        $this->actingAs($user);

        $response = $this->post(route('user.store'), $user2->toArray());
        $response->assertStatus(403);
    })->with([Role::SUPER_USER, Role::USER]);

    test('Update user', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $response = $this->put(route('user.update', $user2), $user2->toArray());
        $response->assertStatus(403);
    })->with([Role::SUPER_USER, Role::USER]);

    test('Delete user', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $response = $this->delete(route('user.destroy', $user2));
        $response->assertStatus(403);
    })->with([Role::SUPER_USER, Role::USER]);
});

describe('Admins can manage users', function () {
    test('List users', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $response = $this->get(route('user.index'));
        $response->assertStatus(200);
    });

    test('Edit user', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('user.edit', $user2));
        $response->assertStatus(200);
    });

    test('Create user', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $response = $this->get(route('user.create'));
        $response->assertStatus(200);
    });

    test('Store user', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $user2 = User::factory()->make();
        $this->actingAs($user);
        $data = $user2->toArray();
        $data['password'] = 'password';

        $response = $this->post(route('user.store'), $data);
        $response->assertStatus(302);
        $this->assertDatabaseHas('users', [
            'email' => $user2->email,
        ]);
    });

    test('Update user', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $user2->email = 'bob@example.com';

        $response = $this->put(route('user.update', $user2), $user2->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('users', [
            'email' => $user2->email,
        ]);
    });

    test('Delete user', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $response = $this->delete(route('user.destroy', $user2));
        $response->assertStatus(302);
    });
});
