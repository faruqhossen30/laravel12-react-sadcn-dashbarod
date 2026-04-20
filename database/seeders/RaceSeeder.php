<?php

namespace Database\Seeders;

use App\Models\Race;
use App\Models\RaceDistance;
use App\Models\Qualifier;
use App\Models\User;
use Nnjeim\World\Models\Country;
use Illuminate\Database\Seeder;
use App\Enums\Terrain;
use App\Enums\RaceFormat;
use App\Enums\CourseType;
use App\Enums\Difficulty;

class RaceSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        // Ensure we have at least these countries if WorldSeeder was skipped
        if (Country::count() === 0) {
            Country::create(['name' => 'Australia', 'iso2' => 'AU', 'iso3' => 'AUS', 'phone_code' => '61', 'region' => 'Oceania', 'subregion' => 'Australia and New Zealand']);
            Country::create(['name' => 'France', 'iso2' => 'FR', 'iso3' => 'FRA', 'phone_code' => '33', 'region' => 'Europe', 'subregion' => 'Western Europe']);
        }

        $australia = Country::where('name', 'Australia')->first() ?? Country::first();
        $france = Country::where('name', 'France')->first() ?? Country::first();

        if (!$australia || !$france) {
            throw new \Exception('Could not create or find countries for seeding.');
        }

        $races = [
            [
                'title' => 'The Blue Mountains 100',
                'description' => 'A stunning 100km journey through the heart of the Blue Mountains National Park. Experience the legendary Giant Stairway and panoramic views.',
                'country_id' => $australia->id,
                'start_date' => now()->addMonths(2),
                'terrain' => Terrain::TRAIL,
                'format' => RaceFormat::SOLO,
                'course_type' => CourseType::SINGLE_LOOP,
                'image_path' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
                'distances' => [
                    ['value' => 100, 'unit' => 'km', 'elevation' => 4500, 'difficulty' => Difficulty::HARD],
                    ['value' => 50, 'unit' => 'km', 'elevation' => 2200, 'difficulty' => Difficulty::INTERMEDIATE],
                ]
            ],
            [
                'title' => 'Mont Blanc Skyrunner',
                'description' => 'The ultimate alpine challenge. High altitude, technical terrain, and the ghost of the Alps guiding your every step.',
                'country_id' => $france->id,
                'start_date' => now()->addMonths(4),
                'terrain' => Terrain::TRAIL,
                'format' => RaceFormat::STAGE,
                'course_type' => CourseType::POINT_TO_POINT,
                'image_path' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
                'distances' => [
                    ['value' => 170, 'unit' => 'km', 'elevation' => 10000, 'difficulty' => Difficulty::HARDEST],
                ]
            ],
            [
                'title' => 'Sydney Road Classic',
                'description' => 'Fast and flat. A premier road ultra starting from the Opera House and heading along the coast.',
                'country_id' => $australia->id,
                'start_date' => now()->addMonths(1),
                'terrain' => Terrain::ROAD,
                'format' => RaceFormat::SOLO,
                'course_type' => CourseType::OUT_AND_BACK,
                'image_path' => 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80',
                'distances' => [
                    ['value' => 50, 'unit' => 'km', 'elevation' => 500, 'difficulty' => Difficulty::BEGINNER],
                ]
            ]
        ];

        foreach ($races as $raceData) {
            $distances = $raceData['distances'];
            unset($raceData['distances']);

            $raceData['slug'] = \Illuminate\Support\Str::slug($raceData['title']);
            $raceData['user_id'] = $user->id;

            $race = Race::create($raceData);

            foreach ($distances as $dist) {
                RaceDistance::create([
                    'race_id' => $race->id,
                    'distance_value' => $dist['value'],
                    'distance_unit' => $dist['unit'],
                    'elevation_gain' => $dist['elevation'],
                    'difficulty' => $dist['difficulty'],
                    'currency' => 'USD',
                    'price' => rand(100, 500)
                ]);
            }
        }

        // Add 20 more random races with multiple distances each
        Race::factory(100)->create()->each(function ($race) {
            RaceDistance::factory(rand(1, 3))->create([
                'race_id' => $race->id
            ]);

            // Randomly attach qualifiers
            $race->qualifiers()->attach(
                Qualifier::inRandomOrder()->take(rand(0, 2))->pluck('id')
            );
        });
    }
}
