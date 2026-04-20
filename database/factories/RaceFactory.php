<?php

namespace Database\Factories;

use App\Models\Race;
use App\Models\User;
use App\Enums\Terrain;
use App\Enums\RaceFormat;
use App\Enums\CourseType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Nnjeim\World\Models\Country;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Race>
 */
class RaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(3, true) . ' ' . fake()->randomElement(['Ultra', 'Trail', 'Marathon', 'Challenge', 'Adventure']);
        $startDate = fake()->dateTimeBetween('now', '+1 year');
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraphs(3, true),
            'country_id' => Country::inRandomOrder()->first()?->id ?? 1,
            'start_date' => $startDate,
            'end_date' => fake()->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +3 days'),
            'terrain' => fake()->randomElement(Terrain::cases()),
            'format' => fake()->randomElement(RaceFormat::cases()),
            'course_type' => fake()->randomElement(CourseType::cases()),
            'image_path' => 'https://picsum.photos/seed/' . rand(1, 1000) . '/800/600',
            'user_id' => User::inRandomOrder()->first()?->id ?? 1,
            'is_featured' => fake()->boolean(20),
        ];
    }
}
