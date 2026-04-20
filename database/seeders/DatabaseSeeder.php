<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123'),
        ]);

        User::create([
            'name' => 'Admin User',
            'email' => 'staff@gmail.com',
            'password' => Hash::make('123'),
        ]);

        User::create([
            'name' => 'Regular User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('123'),
        ]);

        User::factory(50)->create();

        $this->call([
            // WorldSeeder::class,
            RolePermissionSeeder::class,
            MasterDataSeeder::class,
            BlogSeeder::class,
            RaceSeeder::class,
        ]);
    }
}
