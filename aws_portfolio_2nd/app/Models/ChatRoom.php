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

    public function getPartner() {
        foreach($this->users as $user) {
            if($user->id != auth()->user()->id) {
                return $user;
            }
        }
    }
}
