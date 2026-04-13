<?php

namespace App\Http\Requests\Backend\Race;

use App\Enums\CourseType;
use App\Enums\Difficulty;
use App\Enums\RaceFormat;
use App\Enums\Terrain;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRaceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'country_id' => ['required', 'exists:countries,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'terrain' => ['required', new Enum(Terrain::class)],
            'format' => ['required', new Enum(RaceFormat::class)],
            'course_type' => ['required', new Enum(CourseType::class)],
            'image' => ['nullable', 'image', 'max:2048'],
            'is_featured' => ['nullable', 'boolean'],
            'qualifiers' => ['nullable', 'array'],
            'qualifiers.*' => ['exists:qualifiers,id'],
            
            // Distances (Nested)
            'distances' => ['required', 'array', 'min:1'],
            'distances.*.distance_value' => ['required', 'string'],
            'distances.*.distance_unit' => ['required', 'in:km,mi'],
            'distances.*.elevation_gain' => ['nullable', 'integer'],
            'distances.*.difficulty' => ['required', new Enum(Difficulty::class)],
            'distances.*.duration_hhmm' => ['nullable', 'string'],
            'distances.*.price' => ['nullable', 'numeric'],
            'distances.*.currency' => ['nullable', 'string'],
        ];
    }
}
