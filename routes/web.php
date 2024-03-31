<?php

use App\Http\Controllers\ShortUrlViewedController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => redirect()->route('dashboard'));

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    require 'app/short-url.php';
    require 'app/domain.php';
    require 'app/user.php';
    require 'app/settings.php';
});

require 'auth.php';

Route::get('{slug}', ShortUrlViewedController::class);
