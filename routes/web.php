<?php

use App\Http\Controllers\ShortUrlViewedController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => redirect()->route('dashboard'));

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    require __DIR__.'/app/short-url.php';
    require __DIR__.'/app/domain.php';
    require __DIR__.'/app/user.php';
    require __DIR__.'/app/settings.php';
});

require __DIR__.'/auth.php';

Route::get('{slug}', ShortUrlViewedController::class);
