<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'description',
        'country_id',
        'start_date',
        'end_date',
        'terrain',
        'format',
        'course_type',
        'image_path',
        'user_id',
        'is_featured',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'terrain' => \App\Enums\Terrain::class,
        'format' => \App\Enums\RaceFormat::class,
        'course_type' => \App\Enums\CourseType::class,
        'is_featured' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country()
    {
        return $this->belongsTo(\Nnjeim\World\Models\Country::class);
    }

    public function distances()
    {
        return $this->hasMany(RaceDistance::class);
    }

    public function qualifiers()
    {
        return $this->belongsToMany(Qualifier::class, 'race_qualifier');
    }
}
