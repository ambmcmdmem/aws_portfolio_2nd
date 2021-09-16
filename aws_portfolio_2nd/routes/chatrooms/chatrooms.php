<?php // userのルートページ

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatRoomController;

Route::get('/{chatRoom}/app', [ChatRoomController::class, 'app'])->name('chatrooms.app');
Route::post('/create', [ChatRoomController::class, 'create'])->name('chatrooms.create');
Route::post('/{chatRoom}/getApp', [ChatRoomController::class, 'getApp'])->name('chatrooms.getApp');