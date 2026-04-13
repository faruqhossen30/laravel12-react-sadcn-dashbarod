<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\Race\StoreRaceRequest;
use App\Http\Requests\Backend\Race\UpdateRaceRequest;
use App\Models\Race;
use App\Models\Qualifier;
use Nnjeim\World\Models\Country;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class RaceController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:race.list', only: ['index']),
            new Middleware('permission:race.create', only: ['create', 'store']),
            new Middleware('permission:race.update', only: ['edit', 'update']),
            new Middleware('permission:race.delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $races = Race::with(['country', 'distances'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Backend/Race/Index', [
            'races' => $races,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $countries = Country::orderBy('name')->get(['id', 'name']);
        $qualifiers = Qualifier::orderBy('name')->get();
        
        // Enums for frontend
        $enums = [
            'terrain' => \App\Enums\Terrain::cases(),
            'format' => \App\Enums\RaceFormat::cases(),
            'course_type' => \App\Enums\CourseType::cases(),
            'difficulty' => \App\Enums\Difficulty::cases(),
        ];

        return Inertia::render('Backend/Race/Create', [
            'countries' => $countries,
            'qualifiers' => $qualifiers,
            'enums' => $enums,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRaceRequest $request): RedirectResponse
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['title']) . '-' . uniqid();
            $data['user_id'] = auth()->id();

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = 'races/' . $filename;
                
                $image = Image::decode($file);
                $image->scale(width: 1200);
                $image->save(Storage::disk('public')->path($path), 80);
                
                $data['image_path'] = $path;
            }

            $race = Race::create($data);

            // Handle Distances
            if ($request->has('distances')) {
                foreach ($request->distances as $distance) {
                    $race->distances()->create($distance);
                }
            }

            // Handle Qualifiers
            if ($request->has('qualifiers')) {
                $race->qualifiers()->sync($request->qualifiers);
            }

            return redirect()->route('admin.races.index')
                ->with('success', 'Race created successfully.');
        });
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Race $race): Response
    {
        $race->load(['distances', 'qualifiers']);
        
        $countries = Country::orderBy('name')->get(['id', 'name']);
        $qualifiers = Qualifier::orderBy('name')->get();
        
        $enums = [
            'terrain' => \App\Enums\Terrain::cases(),
            'format' => \App\Enums\RaceFormat::cases(),
            'course_type' => \App\Enums\CourseType::cases(),
            'difficulty' => \App\Enums\Difficulty::cases(),
        ];

        return Inertia::render('Backend/Race/Edit', [
            'race' => $race,
            'countries' => $countries,
            'qualifiers' => $qualifiers,
            'enums' => $enums,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRaceRequest $request, Race $race): RedirectResponse
    {
        return DB::transaction(function () use ($request, $race) {
            $data = $request->validated();
            
            // Re-slug if title changed? Optional, but let's keep it simple.
            if ($race->title !== $data['title']) {
                 $data['slug'] = Str::slug($data['title']) . '-' . uniqid();
            }

            if ($request->hasFile('image')) {
                if ($race->image_path) {
                    Storage::disk('public')->delete($race->image_path);
                }
                
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = 'races/' . $filename;
                
                $image = Image::decode($file);
                $image->scale(width: 1200);
                $image->save(Storage::disk('public')->path($path), 80);
                
                $data['image_path'] = $path;
            }

            $race->update($data);

            // Handle Distances (Simple approach: delete existing and re-create, or update intelligently)
            // For simplicity and to avoid complex mapping, we'll sync by ID if possible, elsewhere delete and recreate.
            $existingIds = $race->distances()->pluck('id')->toArray();
            $newIds = [];

            if ($request->has('distances')) {
                foreach ($request->distances as $distanceData) {
                    if (isset($distanceData['id']) && in_array($distanceData['id'], $existingIds)) {
                        $race->distances()->find($distanceData['id'])->update($distanceData);
                        $newIds[] = $distanceData['id'];
                    } else {
                        $newDistance = $race->distances()->create($distanceData);
                        $newIds[] = $newDistance->id;
                    }
                }
            }
            
            // Delete distances that were not in the update request
            $race->distances()->whereNotIn('id', $newIds)->delete();

            // Handle Qualifiers
            if ($request->has('qualifiers')) {
                $race->qualifiers()->sync($request->qualifiers);
            } else {
                $race->qualifiers()->detach();
            }

            return redirect()->route('admin.races.index')
                ->with('success', 'Race updated successfully.');
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Race $race): RedirectResponse
    {
        if ($race->image_path) {
            Storage::disk('public')->delete($race->image_path);
        }

        $race->delete();

        return redirect()->route('admin.races.index')
            ->with('success', 'Race deleted successfully.');
    }
}
