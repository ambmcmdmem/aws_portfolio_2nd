<?php // userのルートページ

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route::get('/search/', [UserController::class, 'search'])->name('users.search');
Route::get('/profile/', [UserController::class, 'profile'])->name('users.profile');
Route::post('/search/', [UserController::class, 'search'])->name('users.search');
