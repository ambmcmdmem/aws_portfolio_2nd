<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatContent;

class ChatContentController extends Controller
{
    //
    public function create() {
        $input = request()->all();
        $input['user_id'] = auth()->user()->id;
        if(request('post_image')) {
            $input['post_image'] = request('post_image')->store('images');
        }

        ChatContent::create($input);

        // return back();
    }
}
