<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_room_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->text('body')->nullable();
            $table->text('post_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_contents');
    }
}
