<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatRoom;
use phpDocumentor\Reflection\DocBlock\Tags\Var_;

// use App\Models\ChatContent;

class ChatRoomController extends Controller
{
    /**
     * App
     *
     * @param ChatRoom $chatRoom
     * @return void
     */
    public function app(ChatRoom $chatRoom) {
        return view('chatrooms.app', compact('chatRoom'));
    }

    public function create(ChatRoom $chatRoom) {
        $input = request()->all();
        $input['user_id'] = auth()->user()->id;
        if(request('post_image')) {
            $input['post_image'] = request('post_image')->store('images');
        }

        $chatRoom->chat_contents()->create($input);

        // return back();
    }

    public function getApp(ChatRoom $chatRoom) {
        return view('components.chat.app', compact('chatRoom'));
    }
}
