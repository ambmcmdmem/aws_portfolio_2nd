<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function chat_contents() {
        return $this->hasMany(ChatContent::class);
    }

    /**
     * パートナーを返す
     *
     * @return User (パートナー)
     */
    public function getPartner(): User {
        foreach($this->users as $user) {
            if($user->id != auth()->user()->id) {
                return $user;
            }
        }
    }

    /**
     * 未読件数を返す
     *
     * @return integer
     */
    public function getUnreadCnt(): int {
        $unreadCnt = 0;

        foreach($this->chat_contents as $chat_content) {
            // 未読 かつ パートナーとIDが一致
            if(!$chat_content->is_read && $chat_content->user_id == $this->getPartner()->id) {
                $unreadCnt++;
            }
        }
        
        return $unreadCnt;
    }
}
