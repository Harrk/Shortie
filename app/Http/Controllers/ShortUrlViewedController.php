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
    public function __invoke(Request $request, $slug): RedirectResponse
    {
        $domain = Domain::where('url', request()->getSchemeAndHttpHost())->firstOrFail();
        $shortUrl = $domain->shortUrls()
            ->where('slug', $slug)
            ->firstOrFail();

        DB::transaction(function () use ($request, $shortUrl) {
            $hash = md5(Agent::getUserAgent().$request->ip().$shortUrl->short_url);

            $shortUrl->logs()->create([
                'device' => Agent::device(),
                'device_type' => Agent::deviceType(),
                'platform' => Str::ucfirst(Agent::platform()),
                'browser' => Agent::browser(),
                'referer' => $request->header('referer'),
                'is_bot' => Agent::isRobot(),
                'hash' => $hash,
            ]);

            $shortUrl->increment('clicks');
        });

        event(new ShortUrlViewed($shortUrl));

        return redirect()->away($shortUrl->url);
    }
}
