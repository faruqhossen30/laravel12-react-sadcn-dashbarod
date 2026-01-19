<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

test('seeder creates roles and permissions', function () {
    expect(Role::count())->toBeGreaterThan(0);
    expect(Permission::count())->toBeGreaterThan(0);
    expect(Role::where('name', 'super-admin')->exists())->toBeTrue();
    expect(Role::where('name', 'admin')->exists())->toBeTrue();
    expect(Role::where('name', 'user')->exists())->toBeTrue();
});

test('admin user has permissions', function () {
    $adminRole = Role::where('name', 'admin')->first();
    expect($adminRole->hasPermissionTo('view users'))->toBeTrue();
    expect($adminRole->hasPermissionTo('create users'))->toBeTrue();
});

test('super admin can bypass permissions', function () {
    $superAdminRole = Role::where('name', 'super-admin')->first();
    $user = User::factory()->create();
    $user->assignRole($superAdminRole);

    $this->actingAs($user);

    // Check if Gate allows a permission the role doesn't explicitly have
    // (though RolePermissionSeeder might not assign explicit permissions to super-admin,
    // the Gate::before in AuthServiceProvider should allow everything)

    // Note: Gate::before works with $user->can(), not necessarily $user->hasPermissionTo() directly
    // depending on how spatie checks. Spatie checks Gate for hasPermissionTo?
    // Actually, $user->can('any permission') should be true.

    expect($user->can('view users'))->toBeTrue();
    expect($user->can('non existent permission'))->toBeTrue(); // Super admin should can everything?
    // Usually Gate::before returns true for everything.
    // Let's check AuthServiceProvider implementation:
    // Gate::before(function ($user, $ability) { return $user->hasRole('super-admin') ? true : null; });
});

test('can list roles', function () {
    $user = User::factory()->create();
    $user->assignRole('super-admin');

    $response = $this->actingAs($user)->get(route('admin.roles.index'));

    $response->assertStatus(200);
});

test('can create role', function () {
    $user = User::factory()->create();
    $user->assignRole('super-admin');

    $response = $this->actingAs($user)->post(route('admin.roles.store'), [
        'name' => 'new-role',
        'permissions' => ['view users'],
    ]);

    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('success');

    expect(Role::where('name', 'new-role')->exists())->toBeTrue();
    expect(Role::where('name', 'new-role')->first()->hasPermissionTo('view users'))->toBeTrue();
});

test('can update role', function () {
    $user = User::factory()->create();
    $user->assignRole('super-admin');

    $role = Role::create(['name' => 'edit-role']);

    $response = $this->actingAs($user)->put(route('admin.roles.update', $role->id), [
        'name' => 'updated-role',
        'permissions' => ['view users'],
    ]);

    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('success');

    expect(Role::where('name', 'updated-role')->exists())->toBeTrue();
    expect(Role::where('name', 'edit-role')->exists())->toBeFalse();
});

test('can delete role', function () {
    $user = User::factory()->create();
    $user->assignRole('super-admin');

    $role = Role::create(['name' => 'delete-role']);

    $response = $this->actingAs($user)->delete(route('admin.roles.destroy', $role->id));

    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('success');

    expect(Role::where('name', 'delete-role')->exists())->toBeFalse();
});

test('cannot delete super-admin role', function () {
    $user = User::factory()->create();
    $user->assignRole('super-admin');

    $role = Role::where('name', 'super-admin')->first();

    $response = $this->actingAs($user)->delete(route('admin.roles.destroy', $role->id));

    $response->assertRedirect(); // Should redirect back
    $response->assertSessionHas('error');

    expect(Role::where('name', 'super-admin')->exists())->toBeTrue();
});
