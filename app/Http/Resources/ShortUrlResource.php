<?php

namespace App\Http\Resources;

use App\Enums\ShortUrlStatus;
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
            'max_visits' => $this->max_visits,
            'clicks' => number_format($this->clicks),
            'created_at' => $this->created_at->format('d/m/Y H:i'),
            'is_active' => $this->status === ShortUrlStatus::ACTIVE,
        ];
    }
}
