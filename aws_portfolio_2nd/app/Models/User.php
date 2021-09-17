<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function chat_rooms() {
        return $this->belongsToMany(ChatRoom::class)->orderBy('updated_at', 'desc');
    }

    public function getAvatarAttribute($avatar) {
        if($avatar) {
            return asset('storage/avatar' . $avatar);
        } else {
            return asset('storage/public/initial_ava.png');
        }
    }

    /**
     * $opponent_userがパートナー（チャットできるか）を返す
     *
     * @param User $opponent_user
     * @return boolean
     */
    public function is_partner(User $opponent_user) {
        foreach($this->chat_rooms as $chat_room) {
            foreach($chat_room->users as $user) {
                if($user == $opponent_user) {
                    return true;
                }
            }
        }
        return false;
    }
}
