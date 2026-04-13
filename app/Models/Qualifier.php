<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Qualifier extends Model
{
    protected $fillable = ['name', 'slug', 'logo_path'];

    public function races()
    {
        return $this->belongsToMany(Race::class);
    }
}
