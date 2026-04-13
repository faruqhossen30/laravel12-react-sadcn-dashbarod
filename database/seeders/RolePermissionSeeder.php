<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $models = ['User', 'Role', 'Race', 'Qualifier'];
        $actions = ['list', 'create', 'update', 'delete'];

        // Create permissions
        foreach ($models as $model) {
            foreach ($actions as $action) {
                Permission::findOrCreate(strtolower($model) . '.' . $action);
            }
        }

        // Create roles and assign permissions
        $superAdminRole = Role::findOrCreate('super-admin');
        $superAdminRole->givePermissionTo(Permission::all());

        $adminRole = Role::findOrCreate('admin');
        // Admin gets all for now
        $adminRole->givePermissionTo(Permission::all());

        $userRole = Role::findOrCreate('user');
        // Regular user might only get list for now
        $userRole->givePermissionTo(['user.list']);

        // Assign roles to seeded users
        $superAdminUser = User::where('email', 'admin@gmail.com')->first();
        if ($superAdminUser) {
            $superAdminUser->assignRole($superAdminRole);
        }

        $adminUser = User::where('email', 'staff@gmail.com')->first();
        if ($adminUser) {
            $adminUser->assignRole($adminRole);
        }

        $regularUser = User::where('email', 'user@gmail.com')->first();
        if ($regularUser) {
            $regularUser->assignRole($userRole);
        }
    }
}
