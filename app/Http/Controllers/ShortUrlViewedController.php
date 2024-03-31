<?php

namespace App\Http\Controllers;

use App\Events\ShortUrlViewed;
use App\Models\Domain;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Jenssegers\Agent\Facades\Agent;

class ShortUrlViewedController extends Controller
{
    private const UNKNOWN = 'Unknown';

    public function __invoke(Request $request, $slug): RedirectResponse
    {
        $domain = Domain::where('url', request()->getSchemeAndHttpHost())->firstOrFail();
        $shortUrl = $domain->shortUrls()
            ->where('slug', $slug)
            ->firstOrFail();

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
        });

        event(new ShortUrlViewed($shortUrl));

        return redirect()->away($shortUrl->url);
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
}
