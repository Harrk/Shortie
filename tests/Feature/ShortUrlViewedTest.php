<?php

use App\Events\ShortUrlViewed;
use App\Models\ShortUrl;
use Illuminate\Support\Facades\Event;

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
        'device_type' => 'desktop',
        'platform' => 'OS X',
        'browser' => 'Safari',
        'referer' => 'https://example.com',
    ]);

    $this->assertDatabaseHas('short_urls', [
        'id' => $shortUrl->id,
        'clicks' => 1,
    ]);

    Event::assertDispatched(ShortUrlViewed::class);
});
