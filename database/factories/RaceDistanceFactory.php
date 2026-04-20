<?php

namespace Database\Factories;

use App\Models\Race;
use App\Models\RaceDistance;
use App\Enums\Difficulty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RaceDistance>
 */
class RaceDistanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'race_id' => Race::factory(),
            'distance_value' => fake()->randomElement(['21', '42', '50', '80', '100', '160']),
            'distance_unit' => fake()->randomElement(['km', 'mi']),
            'elevation_gain' => fake()->numberBetween(500, 10000),
            'difficulty' => fake()->randomElement(Difficulty::cases()),
            'duration_hhmm' => fake()->numberBetween(2, 48) . ':' . fake()->randomElement(['00', '30']),
            'price' => fake()->randomFloat(2, 50, 500),
            'currency' => 'USD',
        ];
    }
}
