<?php

namespace App\Models;

use App\Enums\ShortUrlStatus;
use App\Jobs\CheckShortUrlHealth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShortUrl extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'domain_id',
        'slug',
        'url',
        'max_visits',
        'rules',
        'is_healthy',
        'last_health_check_at',
    ];

    protected $casts = [
        'status' => ShortUrlStatus::class,
        'rules' => 'json',
        'is_healthy' => 'boolean',
        'last_health_check_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::created(function (ShortUrl $shortUrl) {
            CheckShortUrlHealth::dispatch($shortUrl);
        });

        static::updated(function (ShortUrl $shortUrl) {
            if ($shortUrl->wasChanged('url')) {
                CheckShortUrlHealth::dispatch($shortUrl);
            }
        });
    }

    public function getShortUrlAttribute()
    {
        // Todo: Ensure a default domain is created with the below during setup.
        // return request()->getSchemeAndHttpHost().'/'.$this->slug;

        return $this->domain->url.'/'.$this->slug;
    }

    public function logs(): HasMany
    {
        return $this->hasMany(ShortUrlLog::class);
    }

    public function domain(): BelongsTo
    {
        return $this->belongsTo(Domain::class);
    }
}
