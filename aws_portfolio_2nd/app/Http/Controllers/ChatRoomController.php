<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatRoom;
use App\Models\ChatContent;
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

    // public function create(ChatRoom $chatRoom) {
    //     $input = request()->all();
    //     $input['user_id'] = auth()->user()->id;
    //     if(request('post_image')) {
    //         $input['post_image'] = request('post_image')->store('images');
    //     }

    //     $chatRoom->chat_contents()->create($input);

    //     // return back();
    // }

    public function create() {

        if(request('user_id')) {
            $new_chat_room = ChatRoom::create();

            // 自分を割り当て
            $new_chat_room->users()->attach(auth()->user()->id);
            // パートナーを割り当て
            $new_chat_room->users()->attach(request('user_id'));
        }

        // return back();
        return redirect()->route('index');
    }
    

    public function getApp(ChatRoom $chatRoom) {
        // 既読の処理
        ChatContent::whereUserId($chatRoom->getPartner()->id)
            ->whereChatRoomId($chatRoom->id)
            ->update(['is_read' => true]);
        
        // HTMLを返す
        return view('components.chat.app', compact('chatRoom'));
    }
}
