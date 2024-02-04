<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DomainFactory extends Factory
{
    public function definition(): array
    {
        return [
            'url' => 'http://'.$this->faker->uuid.'.com',
        ];
    }
}
