<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'body',
        'post_image'
    ];

    public function chat_room() {
        return $this->belongsTo(ChatRoom::class);
    }

    /**
     * Undocumented function
     *
     * @param [type] $chat_content_id
     * @return void
     */
    public function return_chat_content_class() {
        if($this->user_id == auth()->user()->id) {
            return 'my_chat_content';
        } else {
            return 'partner_chat_content';
        }
    }

    public function getPostImageAttribute($value) {
        if($value) {
            return asset('storage/' . $value);
        }
    }
}
