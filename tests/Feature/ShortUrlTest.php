<?php

use App\Enums\Role;
use App\Models\ShortUrl;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('User can manage own ShortURLs', function () {
    test('Create ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);

        $shortUrlData = ShortUrl::factory()
            ->make()
            ->toArray();

        $response = $this->postJson(route('short-url.store'), $shortUrlData);

        $response->assertStatus(302);
        $this->assertDatabaseHas('short_urls', [
            'user_id' => $user->id,
            'slug' => $shortUrlData['slug'],
            'url' => $shortUrlData['url'],
        ]);
    })->with(Role::cases());

    test('Create ShortURL with valid URLs', function (string $url) {
        $user = User::factory()->create();
        $this->actingAs($user);

        $shortUrlData = ShortUrl::factory()
            ->make([
                'url' => $url,
            ])
            ->toArray();

        $response = $this->postJson(route('short-url.store'), $shortUrlData);

        $response->assertStatus(302);
        $this->assertDatabaseHas('short_urls', [
            'user_id' => $user->id,
            'slug' => $shortUrlData['slug'],
            'url' => $shortUrlData['url'],
        ]);
    })->with([
        'https://laravel.com',
        'https://example.com/test-page/123',
    ]);

    test('Cannot create ShortURL with invalid URLs', function (string $url) {
        $user = User::factory()->create();
        $this->actingAs($user);

        $shortUrlData = ShortUrl::factory()
            ->make([
                'url' => $url,
            ])
            ->toArray();

        $response = $this->postJson(route('short-url.store'), $shortUrlData);

        $response->assertStatus(422);
    })->with([
        'pie',
        '12312',
        '$@££',
        '',
    ]);

    test('Cannot create duplicate Short URL slugs', function () {
        $user = User::factory()->create();
        $this->actingAs($user);

        $existingShortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);
        $newShortUrl = ShortUrl::factory()->make([
            'domain_id' => $existingShortUrl->domain_id,
            'slug' => $existingShortUrl->slug,
        ]);

        $response = $this->postJson(route('short-url.store'), $newShortUrl->toArray());
        $response->assertStatus(422);
    });

    test('Can create duplicate Short URL slug on separate domains', function () {
        $user = User::factory()->create();
        $this->actingAs($user);

        $existingShortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);
        $newShortUrl = ShortUrl::factory()->make([
            'slug' => $existingShortUrl->slug,
        ]);

        $response = $this->postJson(route('short-url.store'), $newShortUrl->toArray());
        $response->assertStatus(302);
    });

    test('Index Own ShortURLs', function () {
        $user = User::factory()->create();
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);

        ShortUrl::factory(10)->create();

        $response = $this->get(route('short-url.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('ShortUrl/Index')
                ->has('shortUrls.data', 1)
                ->has('shortUrls', fn (Assert $page) => $page
                    ->where('data.0.id', $shortUrl->id)
                    ->etc()
                )
            );
        $response->assertStatus(200);
    });

    test('Index All ShortURLs', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);

        ShortUrl::factory(10)->create();

        $response = $this->get(route('short-url.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('ShortUrl/Index')
                ->has('shortUrls.data', 11)
                ->has('shortUrls', fn (Assert $page) => $page
                    ->where('data.0.id', $shortUrl->id)
                    ->etc()
                )
            );
        $response->assertStatus(200);
    })->with([Role::ADMIN, Role::SUPER_USER]);

    test('View ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->get(route('short-url.show', $shortUrl))
            ->assertInertia(fn (Assert $page) => $page
                ->component('ShortUrl/Show')
            );
        $response->assertStatus(200);
    })->with(Role::cases());

    test('Edit ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->get(route('short-url.edit', $shortUrl));
        $response->assertStatus(200);
    })->with(Role::cases());

    test('Update ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);

        $shortUrl->slug = '123';

        $response = $this->put(route('short-url.update', $shortUrl), $shortUrl->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('short_urls', [
            'id' => $shortUrl->id,
            'slug' => 123,
        ]);
    })->with(Role::cases());

    test('Delete ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->delete(route('short-url.destroy', $shortUrl));
        $response->assertStatus(302);
    })->with(Role::cases());
});

describe('User cannot manage others ShortURLs', function () {
    test('View ShortURL', function () {
        $user = User::factory()->create();
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $response = $this->get(route('short-url.show', $shortUrl));
        $response->assertStatus(403);
    });

    test('Edit ShortURL', function () {
        $user = User::factory()->create();
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $response = $this->get(route('short-url.edit', $shortUrl));
        $response->assertStatus(403);
    });

    test('Update ShortURL', function () {
        $user = User::factory()->create();
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $shortUrl->slug = '123';

        $response = $this->put(route('short-url.update', $shortUrl), $shortUrl->toArray());
        $response->assertStatus(403);
    });

    test('Delete ShortURL', function () {
        $user = User::factory()->create();
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $response = $this->delete(route('short-url.destroy', $shortUrl));
        $response->assertStatus(403);
    });
});

describe('User can manage others ShortURLs', function () {
    test('View ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $response = $this->get(route('short-url.show', $shortUrl));
        $response->assertStatus(200);
    })->with([Role::ADMIN, Role::SUPER_USER]);

    test('Edit ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $response = $this->get(route('short-url.edit', $shortUrl));
        $response->assertStatus(200);
    })->with([Role::ADMIN, Role::SUPER_USER]);

    test('Update ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $shortUrl->slug = '123';

        $response = $this->put(route('short-url.update', $shortUrl), $shortUrl->toArray());
        $response->assertStatus(302);
    })->with([Role::ADMIN, Role::SUPER_USER]);

    test('Delete ShortURL', function (Role $role) {
        $user = User::factory()->create(['role' => $role]);
        $this->actingAs($user);
        $shortUrl = ShortUrl::factory()->create();

        $response = $this->delete(route('short-url.destroy', $shortUrl));
        $response->assertStatus(302);
    })->with([Role::ADMIN, Role::SUPER_USER]);
});
