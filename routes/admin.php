<?php

use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\PermissionController;
use App\Http\Controllers\Backend\RoleController;
use App\Http\Controllers\Backend\TenantController;
use App\Http\Controllers\Backend\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Backend/Dashboard');
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('admins', [UserController::class, 'admins'])->name('admin.admins.index');
    Route::resource('users', UserController::class)->names('admin.users');
    Route::resource('roles', RoleController::class)->names('admin.roles');
    Route::resource('permissions', PermissionController::class)
        ->only(['index', 'edit', 'update', 'destroy'])
        ->names('admin.permissions');
    Route::resource('categories', CategoryController::class)->names('admin.categories');
    Route::post('media/upload', [\App\Http\Controllers\Backend\MediaUploadController::class, 'upload'])->name('admin.media.upload');
    Route::resource('blogs', \App\Http\Controllers\Backend\BlogController::class)->names('admin.blogs');
    Route::resource('races', \App\Http\Controllers\Backend\RaceController::class)->names('admin.races');
});
