<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\User\UserIndexRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index(UserIndexRequest $request)
    {
        $filters = (array) $request->get('filters');
        $users = User::query()
            ->when(Arr::get($filters, 'role'), fn ($q) => $q->where('role', $filters['role']))
            ->paginate();

        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            'roles' => Role::cases(),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Edit', [
            'roles' => Role::cases(),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'roles' => Role::cases(),
            'user' => UserResource::make($user),
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $user = User::create($request->validated());

        return redirect()->route('user.edit', $user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());

        return redirect()->route('user.edit', $user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user.index');
    }
}
