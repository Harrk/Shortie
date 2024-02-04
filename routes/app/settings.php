<?php

use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::get('settings', [SettingsController::class, 'edit'])->name('settings.edit');
Route::post('settings', [SettingsController::class, 'update'])->name('settings.update');
