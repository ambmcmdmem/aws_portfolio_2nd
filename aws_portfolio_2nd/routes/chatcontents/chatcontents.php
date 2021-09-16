<?php // userのルートページ

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatContentController;

Route::post('/create/', [ChatContentController::class, 'create'])->name('chatcontents.create');