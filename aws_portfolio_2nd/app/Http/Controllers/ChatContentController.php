<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatContent;
use App\Models\ChatRoom;
use Illuminate\Support\Facades\DB;

class ChatContentController extends Controller
{
    //
    public function create() {
        
        $input = request()->all();
        $input['user_id'] = auth()->user()->id;
        if(request('post_image')) {
            $input['post_image'] = request('post_image')->store('images');
        }

        $new_chat_content = ChatContent::create($input);
        // updated_atを更新
        $new_chat_content->chat_room->touch();
    }
}
