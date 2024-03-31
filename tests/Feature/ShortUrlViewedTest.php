<?php

use App\Enums\ShortUrlStatus;
use App\Events\ShortUrlViewed;
use App\Models\ShortUrl;
use Illuminate\Support\Facades\Event;
use Inertia\Testing\AssertableInertia as Assert;

test('shortUrl has required properties', function () {
    $shortUrl = ShortUrl::factory()->create()->toArray();

    $this->assertArrayHasKey('url', $shortUrl);
    $this->assertArrayHasKey('slug', $shortUrl);
});

test('shortUrl can be viewed', function () {
    Event::fake([
        ShortUrlViewed::class,
    ]);

    $shortUrl = ShortUrl::factory()->create();

    $response = $this->get($shortUrl->short_url, [
        'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.1',
        'referer' => 'https://example.com',
    ]);

    $response->assertStatus(302);
    $response->assertRedirect($shortUrl->url);

    $this->assertDatabaseHas('short_url_logs', [
        'short_url_id' => $shortUrl->id,
        'device' => 'Macintosh',
        'device_type' => 'Desktop',
        'platform' => 'OS X',
        'browser' => 'Safari',
        'referer' => 'https://example.com',
    ]);

    $this->assertDatabaseHas('short_urls', [
        'id' => $shortUrl->id,
        'clicks' => 1,
        'status' => ShortUrlStatus::ACTIVE,
    ]);

    Event::assertDispatched(ShortUrlViewed::class);
});

test('device type is recorded as unknown', function () {
    $shortUrl = ShortUrl::factory()->create();

    $response = $this->get($shortUrl->short_url, [
        'User-Agent' => 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; MATP; MATP)',
        'referer' => 'https://example.com',
    ]);

    $response->assertStatus(302);
    $response->assertRedirect($shortUrl->url);

    $this->assertDatabaseHas('short_url_logs', [
        'short_url_id' => $shortUrl->id,
        'device' => 'Unknown',
        'device_type' => 'Desktop',
        'platform' => 'Windows',
        'browser' => 'IE',
        'referer' => 'https://example.com',
    ]);
});

test('Short URL is set to inactive if max visits is set', function () {
    $shortUrl = ShortUrl::factory()->create([
        'max_visits' => 1,
    ]);

    $response = $this->get($shortUrl->short_url, [
        'User-Agent' => 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; MATP; MATP)',
        'referer' => 'https://example.com',
    ]);

    $response->assertStatus(302);
    $response->assertRedirect($shortUrl->url);

    $this->assertDatabaseHas('short_urls', [
        'id' => $shortUrl->id,
        'status' => ShortUrlStatus::INACTIVE
    ]);

    $this->assertDatabaseCount('short_url_logs', 1);
});

test('Short URL shows expired page if status is inactive', function () {
    $shortUrl = ShortUrl::factory()->create([
        'status' => ShortUrlStatus::INACTIVE,
    ]);

    $this->get($shortUrl->short_url)
        ->assertInertia(fn (Assert $page) => $page
            ->component('ShortUrl/Expired')
        );
});
