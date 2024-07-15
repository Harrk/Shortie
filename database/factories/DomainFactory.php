<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class DomainFactory extends Factory
{
    public function definition(): array
    {
        return [
            'url' => 'http://'.$this->faker->uuid.'.com',
            'domain' => function ($data) {
                $parsedUrl = parse_url($data['url']);
                return Arr::get($parsedUrl, 'host');
            }
        ];
    }
}
