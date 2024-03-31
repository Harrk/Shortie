<?php

namespace App\Http\Controllers;

use App\Enums\ShortUrlStatus;
use App\Events\ShortUrlViewed;
use App\Models\Domain;
use App\Models\ShortUrl;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Jenssegers\Agent\Facades\Agent;

class ShortUrlViewedController extends Controller
{
    private const UNKNOWN = 'Unknown';

    public function __invoke(Request $request, $slug): RedirectResponse|Response
    {
        $shortUrl = $this->fetchShortURLFromRequest($request, $slug);

        if ($shortUrl->status == ShortUrlStatus::INACTIVE) {
            return Inertia::render('ShortUrl/Expired');
        }

        DB::transaction(function () use ($request, $shortUrl) {
            $hash = md5(Agent::getUserAgent().$request->ip().$shortUrl->short_url);

            $shortUrl->logs()->create([
                'device' => $this->parseAgentDevice(),
                'device_type' => Str::title($this->parseAgentDeviceType()),
                'platform' => Str::ucfirst($this->parseAgentPlatform()),
                'browser' => $this->parseAgentBrowser(),
                'referer' => $request->header('referer'),
                'is_bot' => Agent::isRobot(),
                'hash' => $hash,
            ]);

            $shortUrl->increment('clicks');

            $this->deactivateShortUrlIfVisitsExceedMax($shortUrl);
        });

        event(new ShortUrlViewed($shortUrl));

        return redirect()->away($shortUrl->url);
    }

    protected function fetchShortURLFromRequest(Request $request, $slug): ShortUrl
    {
        $domain = Domain::where('url', request()->getSchemeAndHttpHost())->firstOrFail();

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
}
