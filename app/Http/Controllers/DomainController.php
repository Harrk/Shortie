<?php

namespace App\Http\Controllers;

use App\Http\Requests\Domain\DomainStoreRequest;
use App\Http\Resources\DomainResource;
use App\Models\Domain;
use Inertia\Inertia;

class DomainController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Domain::class, 'domain');
    }

    public function index()
    {
        $domains = Domain::withCount('shortUrls')->paginate();

        return Inertia::render('Domain/Index', [
            'domains' => DomainResource::collection($domains),
        ]);
    }

    public function create()
    {
        return Inertia::render('Domain/Edit');
    }

    public function edit(Domain $domain)
    {
        $domain->loadCount('shortUrls');

        return Inertia::render('Domain/Edit', [
            'domain' => DomainResource::make($domain),
        ]);
    }

    public function store(DomainStoreRequest $request)
    {
        Domain::create($request->validated());

        return redirect()->route('domain.index');
    }

    public function update(DomainStoreRequest $request, Domain $domain)
    {
        $domain->update($request->validated());

        return redirect()->route('domain.index');
    }

    public function destroy(Domain $domain)
    {
        if ($domain->shortUrls()->count()) {
            abort(400, 'Cannot remove a domain with Short URLs.');
        }

        $domain->delete();

        return redirect()->route('domain.index');
    }
}
