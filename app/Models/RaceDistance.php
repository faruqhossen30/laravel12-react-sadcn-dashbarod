<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaceDistance extends Model
{
    protected $fillable = [
        'race_id',
        'distance_value',
        'distance_unit',
        'elevation_gain',
        'difficulty',
        'duration_hhmm',
        'price',
        'currency',
    ];

    protected $casts = [
        'difficulty' => \App\Enums\Difficulty::class,
    ];

    public function race()
    {
        return $this->belongsTo(Race::class);
    }
}
