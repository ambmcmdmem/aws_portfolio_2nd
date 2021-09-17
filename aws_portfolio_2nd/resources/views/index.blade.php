@extends('layouts.app')

@section('content')

{{-- ユーザー（友達）検索の窓 --}}
<div id="search_container" class="container">
    <input id="username_search_input" type="text" name="username" placeholder="ユーザーIDを入力してください">
    <button id="user_search_btn" type="submit">検索</button>
</div>

{{-- チャット部分の窓 --}}
<div id="users_container" class="container d-flex justify-content-between mt-4">
    <ul class="d-flex flex-column pl-0">
    @foreach(auth()->user()->chat_rooms as $chat_room)
        <li id="chat_room_{{ $chat_room->id }}" class="d-flex align-items-center chat_room_link_item" data-posturl="{{ route('chatrooms.getApp', $chat_room) }}">
            <img src="{{ $chat_room->getPartner()->avatar }}" alt="" width="60">
            <div class="">{{ $chat_room->getPartner()->name }}</div>
            <time>{{ $chat_room->updated_at }}</time>
            @if($chat_room->getUnreadCnt())
                <span id="chat_notification_{{ $chat_room->id }}" class="badge badge-pill badge-dark">{{ $chat_room->getUnreadCnt() }}</span>
            @endif
        </li>
    @endforeach
    </ul>    
</div>

@endsection

@section('style')
    <link href="{{ asset('css/chat.css') }}" rel="stylesheet">
@endsection

@section('script')
    <script src="{{ asset('js/chat.js') }}" defer></script>
    <script src="{{ asset('js/users/search.js') }}" defer></script>
@endsection