<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShortUrlResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'domain_id' => $this->domain_id,
            'short_url' => $this->short_url,
            'slug' => $this->slug,
            'url' => $this->url,
            'clicks' => number_format($this->clicks),
            'created_at' => $this->created_at->format('d/m/Y H:i'),
        ];
    }
}
