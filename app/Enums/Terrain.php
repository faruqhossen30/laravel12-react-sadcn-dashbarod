<?php

namespace App\Enums;

enum Terrain: string
{
    case TRAIL = 'trail';
    case ROAD = 'road';
    case TRACK = 'track';
    case MIXED = 'mixed';
}
