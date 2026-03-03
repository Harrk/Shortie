<?php

namespace App\Console\Commands;

use App\Enums\ShortUrlStatus;
use App\Jobs\CheckShortUrlHealth;
use App\Models\ShortUrl;
use Illuminate\Console\Command;

class RunShortUrlHealthChecks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-short-url-health-checks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Execute jobs to check short url statuses';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ShortUrl::query()
            ->where('status', ShortUrlStatus::ACTIVE)
            ->each(fn (ShortUrl $shortUrl) => CheckShortUrlHealth::dispatch($shortUrl));
    }
}
