<?php

use App\Enums\Role;
use App\Models\Domain;
use App\Models\ShortUrl;
use App\Models\User;

describe('Can manage domains', function () {
    test('List domains', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $response = $this->get(route('domain.index'));
        $response->assertStatus(200);
    });

    test('Edit domain', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $domain = Domain::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('domain.edit', $domain));
        $response->assertStatus(200);

    });

    test('Create domain', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $response = $this->get(route('domain.create'));
        $response->assertStatus(200);
    });

    test('Store domain', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $domain = Domain::factory()->make();
        $this->actingAs($user);

        $response = $this->postJson(route('domain.store'), $domain->toArray());
        $response->assertStatus(302);

        $this->assertDatabaseHas('domains', [
            'url' => $domain->url,
        ]);
    });

    test('Store domain with valid domain names', function (string $url) {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $domain = Domain::factory()->make([
            'url' => $url,
        ]);
        $this->actingAs($user);

        $response = $this->postJson(route('domain.store'), $domain->toArray());
        $response->assertStatus(302);

        $this->assertDatabaseHas('domains', [
            'url' => $domain->url,
        ]);
    })->with([
        'https://test.com',
        'http://test.com',
        'http://test.com:8000',
    ]);

    test('Store domain with invalid domain names', function (string $url) {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $domain = Domain::factory()->make([
            'url' => $url,
        ]);
        $this->actingAs($user);

        $response = $this->postJson(route('domain.store'), $domain->toArray());
        $response->assertStatus(422);
    })->with([
        'test',
        'test.com',
        'test.com/test/',
        'test.com:8000',
    ]);

    test('Cannot create duplicate domains', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);

        $existingDomain = Domain::factory()->create();
        $newDomain = Domain::factory()->make([
            'url' => $existingDomain->url,
        ]);

        $response = $this->postJson(route('domain.store'), $newDomain->toArray());
        $response->assertStatus(422);
    });

    test('Update domain', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $domain = Domain::factory()->create();
        $this->actingAs($user);

        $domain->url = 'http://bob-something.com';

        $response = $this->put(route('domain.update', $domain), $domain->toArray());
        $response->assertStatus(302);

        $this->assertDatabaseHas('domains', [
            'id' => $domain->id,
            'url' => $domain->url,
        ]);
    });

    test('Delete domain', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $domain = Domain::factory()->create();
        $this->actingAs($user);

        $response = $this->delete(route('domain.destroy', $domain));
        $response->assertStatus(302);
    });

    test('Cannot delete domain with short URLs', function () {
        $user = User::factory()->create(['role' => Role::ADMIN]);
        $this->actingAs($user);
        $domain = Domain::factory()->create();

        ShortUrl::factory()->create([
            'domain_id' => $domain->id,
        ]);

        $this->withoutExceptionHandling();
        $this->expectException(\Symfony\Component\HttpKernel\Exception\HttpException::class);
        $response = $this->deleteJson(route('domain.destroy', $domain));
        $response->assertStatus(400);
    });
});

describe('Cannot manage domains', function () {
    test('List domains', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->get(route('domain.index'));
        $response->assertStatus(403);
    })->with([Role::USER, Role::SUPER_USER]);

    test('Edit domain', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $domain = Domain::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('domain.edit', $domain));
        $response->assertStatus(403);

    })->with([Role::USER, Role::SUPER_USER]);

    test('Create domain', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $response = $this->get(route('domain.create'));
        $response->assertStatus(403);

    })->with([Role::USER, Role::SUPER_USER]);

    test('Store domain', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $domain = Domain::factory()->make();
        $this->actingAs($user);

        $response = $this->postJson(route('domain.store'), $domain->toArray());
        $response->assertStatus(403);

    })->with([Role::USER, Role::SUPER_USER]);

    test('Update domain', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $domain = Domain::factory()->create();
        $this->actingAs($user);

        $response = $this->put(route('domain.update', $domain), $domain->toArray());
        $response->assertStatus(403);

    })->with([Role::USER, Role::SUPER_USER]);

    test('Delete domain', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $domain = Domain::factory()->create();
        $this->actingAs($user);

        $response = $this->delete(route('domain.destroy', $domain));
        $response->assertStatus(403);

    })->with([Role::USER, Role::SUPER_USER]);
});
