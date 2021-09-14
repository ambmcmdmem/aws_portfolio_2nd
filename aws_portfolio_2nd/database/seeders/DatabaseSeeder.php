<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\User;
use \App\Models\ChatRoom;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();

        // マイ情報
        $myId;

        if(!User::whereName('Daiki')->exists()) {
            $myId = User::insertId([
                'name' => 'Daiki',
                'email' => 'ambmcmdmem@au.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Daiki12345'), // password
                'remember_token' => Str::random(10),
            ]);
        } else {
            $myId = User::whereName('Daiki')->first()->id;
        }

        ChatRoom::factory(2)->create();

        if(DB::table('chat_room_user')->whereUserId(1)->exists()) {
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
