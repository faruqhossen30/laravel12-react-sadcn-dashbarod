<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\TenantRequest;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tenants = Tenant::with('domains')->latest()->get();

        return Inertia::render('Backend/Tenant/Index', [
            'tenants' => $tenants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Backend/Tenant/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TenantRequest $request): RedirectResponse
    {
        $tenant = Tenant::create($request->safe()->except(['domain', 'user_password']) + [
            'user_password' => Hash::make($request->user_password),
        ]);

        $tenant->createDomain(['domain' => $request->domain]);

        return redirect()->route('admin.tenants.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant): Response
    {
        $tenant->load('domains');

        return Inertia::render('Backend/Tenant/Edit', [
            'tenant' => $tenant,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TenantRequest $request, Tenant $tenant): RedirectResponse
    {
        $tenant->update($request->safe()->except(['domain']));

        $domain = $tenant->domains()->first();
        if ($domain) {
            $domain->update(['domain' => $request->domain]);
        } else {
            $tenant->createDomain(['domain' => $request->domain]);
        }

        return redirect()->route('admin.tenants.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant): RedirectResponse
    {
        $tenant->delete();

        return redirect()->route('admin.tenants.index');
    }
}
