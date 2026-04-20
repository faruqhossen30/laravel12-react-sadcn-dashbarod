<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Race;
use App\Models\Qualifier;
use App\Enums\Terrain;
use App\Enums\RaceFormat;
use App\Enums\CourseType;
use App\Enums\Difficulty;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Nnjeim\World\Models\Country;

class RaceController extends Controller
{
    /**
     * Display a listing of the races with filtering.
     */
    public function index(Request $request): Response
    {
        $query = Race::with(['country', 'distances', 'qualifiers']);

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filters
        if ($request->filled('terrain')) {
            $query->whereIn('terrain', (array) $request->terrain);
        }

        if ($request->filled('country')) {
            $query->whereIn('country_id', (array) $request->country);
        }

        if ($request->filled('course_type')) {
            $query->whereIn('course_type', (array) $request->course_type);
        }

        if ($request->filled('format')) {
            $query->whereIn('format', (array) $request->format);
        }

        // Distance & Difficulty filters (via distances relationship)
        if ($request->filled('difficulty') || $request->filled('distance_min') || $request->filled('distance_max')) {
            $query->whereHas('distances', function ($q) use ($request) {
                if ($request->filled('difficulty')) {
                    $q->whereIn('difficulty', (array) $request->difficulty);
                }
                if ($request->filled('distance_min')) {
                    $q->where('distance_value', '>=', $request->distance_min);
                }
                if ($request->filled('distance_max')) {
                    $q->where('distance_value', '<=', $request->distance_max);
                }
            });
        }

        $races = $query->latest('start_date')->paginate(10)->withQueryString();

        return Inertia::render('Frontend/Race/Index', [
            'races' => $races,
            'filters' => $request->all([
                'search', 'terrain', 'country', 'course_type', 'format', 'difficulty', 'distance_min', 'distance_max'
            ]),
            'options' => [
                'terrains' => Terrain::cases(),
                'formats' => RaceFormat::cases(),
                'courseTypes' => CourseType::cases(),
                'difficulties' => Difficulty::cases(),
                'countries' => Country::whereIn('id', Race::distinct()->pluck('country_id'))->get(['id', 'name']),
                'years' => Race::selectRaw('YEAR(start_date) as year')->distinct()->orderBy('year', 'desc')->pluck('year'),
            ]
        ]);
    }

    /**
     * Display the specified race.
     */
    public function show(string $slug): Response
    {
        $race = Race::with(['country', 'distances', 'qualifiers', 'user'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Frontend/Race/Show', [
            'race' => $race,
        ]);
    }
}
