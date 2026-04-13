<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $qualifiers = [
            ['name' => 'UTMB Index', 'slug' => 'utmb-index'],
            ['name' => 'UTMB World Series', 'slug' => 'utmb-world-series'],
            ['name' => 'UTMB World Series Majors', 'slug' => 'utmb-world-series-majors'],
            ['name' => 'Western States Qualifier', 'slug' => 'western-states-qualifier'],
        ];

        foreach ($qualifiers as $qualifier) {
            \App\Models\Qualifier::updateOrCreate(['slug' => $qualifier['slug']], $qualifier);
        }
    }
}
