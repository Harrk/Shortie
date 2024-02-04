<?php

use App\Http\Controllers\DomainController;
use Illuminate\Support\Facades\Route;

Route::resource('domain', DomainController::class);
