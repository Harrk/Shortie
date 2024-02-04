<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\Settings\GeneralSettingsUpdateRequest;
use App\Settings\GeneralSettings;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:update-settings');
    }

    public function edit(GeneralSettings $settings)
    {
        return Inertia::render('Settings/Edit', [
            'settings' => $settings,
            'roles' => Role::cases(),
        ]);
    }

    public function update(GeneralSettings $settings, GeneralSettingsUpdateRequest $request)
    {
        $settings->fill($request->validated());
        $settings->save();

        return redirect()->route('settings.edit');
    }
}
