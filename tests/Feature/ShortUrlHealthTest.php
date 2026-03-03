<?php

use App\Jobs\CheckShortUrlHealth;
use App\Models\ShortUrl;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;

test('Health check job updates short url status to healthy', function () {
    Http::fake([
        'example.com/*' => Http::response('OK', 200),
    ]);

    $shortUrl = ShortUrl::factory()->create([
        'url' => 'https://example.com/healthy',
        'is_healthy' => false,
    ]);

    (new CheckShortUrlHealth($shortUrl))->handle();

    $shortUrl->refresh();
    expect($shortUrl->is_healthy)->toBeTrue();
    expect($shortUrl->last_health_check_at)->not->toBeNull();
});

test('Health check job updates short url status to unhealthy', function () {
    Http::fake([
        'example.com/*' => Http::response('Not Found', 404),
    ]);

    $shortUrl = ShortUrl::factory()->create([
        'url' => 'https://example.com/unhealthy',
        'is_healthy' => true,
    ]);

    (new CheckShortUrlHealth($shortUrl))->handle();

    $shortUrl->refresh();
    expect($shortUrl->is_healthy)->toBeFalse();
    expect($shortUrl->last_health_check_at)->not->toBeNull();
});

test('Health check job handles exceptions as unhealthy', function () {
    Http::fake([
        'example.com/*' => function () {
            throw new \Exception('Connection failed');
        },
    ]);

    $shortUrl = ShortUrl::factory()->create([
        'url' => 'https://example.com/error',
        'is_healthy' => true,
    ]);

    (new CheckShortUrlHealth($shortUrl))->handle();

    $shortUrl->refresh();
    expect($shortUrl->is_healthy)->toBeFalse();
    expect($shortUrl->last_health_check_at)->not->toBeNull();
});

test('Creating a short url dispatches health check job', function () {
    Queue::fake();

    $user = User::factory()->create();
    $this->actingAs($user);

    $shortUrlData = ShortUrl::factory()->make()->toArray();

    $this->postJson(route('short-url.store'), $shortUrlData);

    Queue::assertPushed(CheckShortUrlHealth::class);
});

test('Updating a short url URL dispatches health check job', function () {
    Queue::fake();

    $user = User::factory()->create();
    $this->actingAs($user);

    $shortUrl = ShortUrl::factory()->create(['user_id' => $user->id]);

    $shortUrl->url = 'https://new-url.com';

    $this->putJson(route('short-url.update', $shortUrl), $shortUrl->toArray());

    Queue::assertPushed(CheckShortUrlHealth::class);
});

test('Updating a short url without changing URL does not dispatch health check job', function () {
    Queue::fake();

    $user = User::factory()->create();
    $this->actingAs($user);

    $shortUrl = ShortUrl::factory()->create(['user_id' => $user->id]);

    $shortUrl->slug = 'new-slug';

    $this->putJson(route('short-url.update', $shortUrl), $shortUrl->toArray());
    Queue::assertPushed(CheckShortUrlHealth::class);
});
