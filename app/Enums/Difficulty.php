<?php

namespace App\Enums;

enum Difficulty: string
{
    case BEGINNER = 'beginner';
    case INTERMEDIATE = 'intermediate';
    case HARD = 'hard';
    case HARDEST = 'hardest';
}
