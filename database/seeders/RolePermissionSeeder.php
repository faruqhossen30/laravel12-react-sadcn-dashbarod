<?php

namespace Database\Seeders;

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

        // Create permissions
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign existing permissions
        $role1 = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        $role2 = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $role2->givePermissionTo('view users');
        $role2->givePermissionTo('create users');
        $role2->givePermissionTo('edit users');
        $role2->givePermissionTo('view roles');
        $role2->givePermissionTo('view permissions');

        $role3 = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
        // User gets no specific permissions by default in this example

        // Assign super-admin role to the first user if exists
        $user = \App\Models\User::first();
        if ($user) {
            $user->assignRole($role1, $role2);
        }
    }
}
