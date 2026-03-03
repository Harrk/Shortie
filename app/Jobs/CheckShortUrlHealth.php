<?php

namespace App\Jobs;

use App\Models\ShortUrl;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class CheckShortUrlHealth implements ShouldQueue
{
    use Dispatchable, Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public ShortUrl $shortUrl)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $response = Http::timeout(10)->get($this->shortUrl->url);

            $isHealthy = $response->successful();
        } catch (\Exception $e) {
            $isHealthy = false;
        }

        $this->shortUrl->update([
            'is_healthy' => $isHealthy,
            'last_health_check_at' => now(),
        ]);
    }
}
