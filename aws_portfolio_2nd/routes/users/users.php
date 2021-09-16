<?php // userのルートページ

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', [UserController::class, 'index'])->name('users.index');
Route::get('/search/', [UserController::class, 'search'])->name('users.search');