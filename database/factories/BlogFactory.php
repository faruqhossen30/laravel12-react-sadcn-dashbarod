<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => fake()->paragraphs(5, true),
            'image' => 'https://picsum.photos/seed/' . rand(1, 1000) . '/1200/800',
            'meta_title' => $title,
            'meta_description' => fake()->sentence(),
            'meta_keywords' => implode(',', fake()->words(5)),
        ];
    }
}
