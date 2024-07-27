<?php

namespace App\Http\Controllers;

use App\Enums\ShortUrlStatus;
use App\Http\Requests\ShortUrl\ShortUrlDestroyRequest;
use App\Http\Requests\ShortUrl\ShortUrlIndexRequest;
use App\Http\Requests\ShortUrl\ShortUrlStoreRequest;
use App\Http\Requests\ShortUrl\ShortUrlUpdateRequest;
use App\Http\Resources\ShortUrlResource;
use App\Models\Domain;
use App\Models\ShortUrl;
use App\Settings\GeneralSettings;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShortUrlController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(ShortUrl::class, 'short_url');
    }

    public function index(ShortUrlIndexRequest $request)
    {
        $shortUrls = ShortUrl::query()
            ->when(! Auth::user()->isSuper(), function ($q) {
                $q->where('user_id', Auth::id());
            })
            ->when(
                $request->input('filters.domain_id'),
                fn ($q) => $q->where('domain_id', $request->input('filters.domain_id'))
            )
            ->orderBy(
                $request->input('sort.field', 'created_at'),
                $request->input('sort.order', 'desc')
            )
            ->paginate();

        return Inertia::render('ShortUrl/Index', [
            'shortUrls' => ShortUrlResource::collection($shortUrls),
            'domains' => Domain::pluck('url', 'id'),
            'filters' => $request->input('filters'),
            'sort' => $request->input('sort'),
        ]);
    }

    public function show(GeneralSettings $settings, ShortUrl $shortUrl)
    {
        $defaultPeriod = '30 Days';
        // Filters
        $periods = [
            'Today' => 1,
            '7 Days' => 7,
            '30 Days' => 30,
            'Lifetime' => null,
        ];

        $period = request()->input('period', $defaultPeriod);
        $selectedPeriod = Arr::get($periods, $period, 30);
        $periodFrom = $selectedPeriod ? today()->subDays($selectedPeriod - 1) : null;

        $clicks = $shortUrl->logs()
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->count();

        $humanClicks = $shortUrl->logs()
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->where('is_bot', false)->count();

        $botClicks = $shortUrl->logs()
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->where('is_bot', true)->count();

        $uniqueClicks = $shortUrl->logs()
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->where('is_bot', false)->distinct('hash')->count();

        $topDevices = $shortUrl->logs()
            ->selectRaw('device, COUNT(*) AS count')
            ->where('is_bot', false)
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->groupBy('device')
            ->limit(5)
            ->orderBy('count', 'DESC')
            ->pluck('count', 'device');

        $topDeviceTypes = $shortUrl->logs()
            ->selectRaw('device_type, COUNT(*) AS count')
            ->where('is_bot', false)
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->groupBy('device_type')
            ->limit(5)
            ->orderBy('count', 'DESC')
            ->pluck('count', 'device_type');

        $topOperatingSystems = $shortUrl->logs()
            ->selectRaw('platform, COUNT(*) AS count')
            ->where('is_bot', false)
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->groupBy('platform')
            ->limit(5)
            ->orderBy('count', 'DESC')
            ->pluck('count', 'platform');

        $topBrowsers = $shortUrl->logs()
            ->selectRaw('browser, COUNT(*) AS count')
            ->where('is_bot', false)
            ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
            ->groupBy('browser')
            ->limit(5)
            ->orderBy('count', 'DESC')
            ->pluck('count', 'browser');

        if ($settings->enableGeolocation) {
            $topCountries = $shortUrl->logs()
                ->selectRaw('country, COUNT(*) AS count')
                ->where('is_bot', false)
                ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
                ->groupBy('country')
                ->limit(5)
                ->orderBy('count', 'DESC')
                ->pluck('count', 'country')
                ->mapWithKeys(fn ($value, $key) => [$key === '' ? 'Unknown' : $key => $value]);

            $topCities = $shortUrl->logs()
                ->selectRaw('city, COUNT(*) AS count')
                ->where('is_bot', false)
                ->when($periodFrom, fn ($q) => $q->whereDate('created_at', '>=', $periodFrom))
                ->groupBy('city')
                ->limit(5)
                ->orderBy('count', 'DESC')
                ->pluck('count', 'city')
                ->mapWithKeys(fn ($value, $key) => [$key === '' ? 'Unknown' : $key => $value]);
        }

        $chartFrom = today()->subDays(max(7, ($selectedPeriod ?? 30) - 1));
        $days = collect($chartFrom->range(today())->toArray())
            ->map(fn ($date) => $date->format('Y-m-d'));

        $botDays = $shortUrl->logs()
            ->selectRaw('DATE(created_at) AS date, COUNT(*) AS count')
            ->where('is_bot', true)
            ->whereDate('created_at', '>=', $chartFrom)
            ->groupByRaw('DATE(created_at)')
            ->pluck('count', 'date');

        $humanDays = $shortUrl->logs()
            ->selectRaw('DATE(created_at) AS date, COUNT(*) AS count')
            ->where('is_bot', false)
            ->whereDate('created_at', '>=', $chartFrom)
            ->distinct('hash')
            ->groupByRaw('DATE(created_at)')
            ->pluck('count', 'date');

        $clicksOverTime = [[
            'name' => 'Bots',
            'data' => $days->map(fn ($day) => $botDays[$day] ?? 0),
        ], [
            'name' => 'Humans',
            'data' => $days->map(fn ($day) => $humanDays[$day] ?? 0),
        ]];

        return Inertia::render('ShortUrl/Show', [
            'shortUrl' => ShortUrlResource::make($shortUrl),
            'periods' => $periods,
            'selectedPeriod' => $period,
            'clicks' => $clicks,
            'humanClicks' => $humanClicks,
            'botClicks' => $botClicks,
            'uniqueClicks' => $uniqueClicks,
            'clicksOverTime' => $clicksOverTime,
            'days' => $days->map(fn ($date) => Carbon::make($date)->format('jS M, Y')),
            'topDevices' => $topDevices,
            'topDeviceTypes' => $topDeviceTypes,
            'topOperatingSystems' => $topOperatingSystems,
            'topBrowsers' => $topBrowsers,
            'enableGeolocation' => $settings->enableGeolocation,
            'topCountries' => $topCountries ?? [],
            'topCities' => $topCities ?? [],
        ]);
    }

    public function create()
    {
        return Inertia::render('ShortUrl/Edit', [
            'domains' => Domain::query()->pluck('url', 'id'),
            'shortUrl' => [
                'domain_id' => Domain::value('id'),
                'slug' => Str::random(6),
            ],
        ]);
    }

    public function edit(ShortUrl $shortUrl)
    {
        return Inertia::render('ShortUrl/Edit', [
            'shortUrl' => ShortUrlResource::make($shortUrl),
            'domains' => Domain::query()->pluck('url', 'id'),
            'copy' => request()->boolean('copy'),
        ]);
    }

    public function store(ShortUrlStoreRequest $request)
    {
        $shortUrl = ShortUrl::create([
            ...$request->validated(),
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('short-url.edit', [
            $shortUrl,
            'copy' => true,
        ]);
    }

    public function update(ShortUrlUpdateRequest $request, ShortUrl $shortUrl)
    {
        DB::transaction(function () use ($request, $shortUrl) {
            $shortUrl->fill($request->validated());

            // Ensure status responds to the max visits field.
            $shortUrl->status = ($shortUrl->max_visits === null || $shortUrl->max_visits > $shortUrl->clicks)
                ? ShortUrlStatus::ACTIVE
                : ShortUrlStatus::INACTIVE;

            $shortUrl->save();
        });

        return redirect()->route('short-url.edit', $shortUrl);
    }

    public function destroy(ShortUrlDestroyRequest $request, ShortUrl $shortUrl)
    {
        $shortUrl->delete();

        return redirect()->route('short-url.index');
    }
}
