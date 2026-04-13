<?php

namespace App\Enums;

enum CourseType: string
{
    case POINT_TO_POINT = 'point_to_point';
    case SINGLE_LOOP = 'single_loop';
    case MULTIPLE_LOOPS = 'multiple_loops';
    case OUT_AND_BACK = 'out_and_back';
}
