<?php // userのルートページ

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatRoomController;

Route::get('/{chatRoom}/app', [ChatRoomController::class, 'app'])->name('chatrooms.app');
Route::post('/{chatRoom}/app', [ChatRoomController::class, 'create'])->name('chatrooms.create');