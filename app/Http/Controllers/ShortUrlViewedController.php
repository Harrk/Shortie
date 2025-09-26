<?php

namespace App\Http\Controllers;

use App\Enums\ShortUrlStatus;
use App\Events\ShortUrlViewed;
use App\Models\Domain;
use App\Models\ShortUrl;
use App\Models\ShortUrlLog;
use App\Settings\GeneralSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Jenssegers\Agent\Facades\Agent;

class ShortUrlViewedController extends Controller
{
    private const UNKNOWN = 'Unknown';

    public function __invoke(Request $request, GeneralSettings $settings, $slug): RedirectResponse|Response
    {
        $shortUrl = $this->fetchShortURLFromRequest($request, $slug);
        $redirectionUrl = $shortUrl->url;

        if ($shortUrl->status == ShortUrlStatus::INACTIVE) {
            return Inertia::render('ShortUrl/Expired');
        }

        DB::transaction(function () use ($request, $shortUrl, $settings, &$redirectionUrl) {
            $hash = md5(Agent::getUserAgent().$request->ip().$shortUrl->short_url);

            if ($settings->enableGeolocation) {
                $lookupData = geoip()->getLocation($request->ip());
            }

            $shortUrlLog = $shortUrl->logs()->create([
                'device' => $this->parseAgentDevice(),
                'device_type' => Str::title($this->parseAgentDeviceType()),
                'platform' => $this->parseAgentPlatform(),
                'browser' => $this->parseAgentBrowser(),
                'referer' => $request->header('referer'),
                'is_bot' => Agent::isRobot(),
                'hash' => $hash,
                'country' => $lookupData->country ?? null,
                'city' => $lookupData->city ?? null,
            ]);

            $redirectionUrl = $this->processShortUrlRules($shortUrl, $shortUrlLog);

            $shortUrl->increment('clicks');

            $this->deactivateShortUrlIfVisitsExceedMax($shortUrl);
        });

        event(new ShortUrlViewed($shortUrl));

        return redirect()->away($redirectionUrl);
    }

    protected function fetchShortURLFromRequest(Request $request, $slug): ShortUrl
    {
        $domain = Domain::whereIn('domain', [
            request()->host(),
            request()->getHttpHost(),
        ])->firstOrFail();

        return $domain->shortUrls()
            ->where('slug', $slug)
            ->firstOrFail();
    }

    protected function parseAgentDevice(): string
    {
        return Agent::device() ?: self::UNKNOWN;
    }

    protected function parseAgentDeviceType(): string
    {
        return Agent::deviceType() ?: self::UNKNOWN;
    }

    protected function parseAgentPlatform(): string
    {
        return Agent::platform() ?: self::UNKNOWN;
    }

    protected function parseAgentBrowser(): string
    {
        return Agent::browser() ?: self::UNKNOWN;
    }

    protected function deactivateShortUrlIfVisitsExceedMax(ShortUrl $shortUrl)
    {
        if ($shortUrl->max_visits && $shortUrl->clicks >= $shortUrl->max_visits) {
            $shortUrl->status = ShortUrlStatus::INACTIVE;
            $shortUrl->save();
        }
    }

    protected function processShortUrlRules(ShortUrl $shortUrl, ShortUrlLog $shortUrlLog): string
    {
        foreach ((array) $shortUrl->rules as $rule) {
            [$ruleKey, $ruleOperator, $ruleValue, $redirectUrl] = array_values(Arr::only($rule, [
                'key',
                'operator',
                'value',
                'url',
            ]));

            if (! $shortUrlLog->hasAttribute($ruleKey)) {
                continue;
            }

            $valueToCompare = $shortUrlLog->{$ruleKey};

            if ($ruleOperator === '=' && $valueToCompare === $ruleValue) {
                return $redirectUrl;
            }

            if ($ruleOperator === '!=' && $valueToCompare !== $ruleValue) {
                return $redirectUrl;
            }
        }

        return $shortUrl->url;
    }
}
