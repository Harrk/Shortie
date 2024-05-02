<?php

namespace Database\Factories;

use App\Models\Domain;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShortUrlFactory extends Factory
{
    public function definition(): array
    {
        return [
            'domain_id' => Domain::factory(),
            'user_id' => User::factory(),
            'slug' => Str::random(6),
            'url' => $this->faker->url,
            'clicks' => $this->faker->numberBetween(0, 10000),
        ];
    }
}
