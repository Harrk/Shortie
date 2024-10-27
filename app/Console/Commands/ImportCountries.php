<?php

namespace App\Console\Commands;

use App\Models\Country;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ImportCountries extends Command
{
    protected $signature = 'app:import-countries';

    protected $description = 'Imports countries into the database via third party API';

    public function handle()
    {
        $api = 'https://restcountries.com/v3.1/all?fields=name,cca2,cca3';
        $response = collect(Http::get($api)->json());

        $countryData = $response->map(fn ($row) => [
            'name' => Arr::get($row, 'name.common'),
            'iso2' => Arr::get($row, 'cca2'),
            'iso3' => Arr::get($row, 'cca3'),
            'created_at' => now(),
            'updated_at' => now(),
        ])->toArray();

        DB::table('countries')->truncate();
        Country::query()->insert($countryData);
    }
}
