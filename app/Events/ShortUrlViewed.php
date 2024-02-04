<?php

namespace App\Events;

use App\Models\ShortUrl;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ShortUrlViewed
{
    use Dispatchable, SerializesModels;

    public function __construct(protected ShortUrl $shortUrl)
    {
    }
}
