<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use \App\Models\ChatRoom;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class ChatRoomUserTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::factory(10)->create();
        ChatRoom::factory(2)->create();
        $myId = -1;

        $myName = 'TestDaiki';

        // Daiki(テストの自分のユーザ)がいれば
        // if(!User::whereName($myName)->exists()) {
        //     $myId = User::insertGetId([
        //         'username' => $myName,
        //         'name' => $myName,
        //         'email' => 'ambmcmdmem@au.com',
        //         'email_verified_at' => now(),
        //         'password' => Hash::make('Daiki12345'), // password
        //         'remember_token' => Str::random(10),
        //     ]);
        // } else {
        //     $myId = User::whereName('Daiki')->first()->id;
        // }

        // UserId1のゆーざと自分をくっつける
        if(!DB::table('chat_room_user')->whereUserId(1)->exists()) {
            DB::table('chat_room_user')->insert([
                'user_id' => 1,
                'chat_room_id' => 1
            ]);

            DB::table('chat_room_user')->insert([
                'user_id' => $myId,
                'chat_room_id' => 1
            ]);
        }
    }
}
