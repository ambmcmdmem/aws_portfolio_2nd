@extends('layouts.app')

@section('content')

<div id="users_container" class="container d-flex">

    <ul>
    @foreach(auth()->user()->chat_rooms as $chat_room)
        <li id="chat_room_{{ $chat_room->id }}" class="d-flex align-items-center chat_room_link_item" data-posturl="{{ route('chatrooms.getApp', $chat_room) }}">
            <img src="{{ $chat_room->getPartner()->avatar }}" alt="" width="60">
            {{-- <a href="{{route('chatrooms.app', $chat_room)}}">{{ $chat_room->getPartner()->name }}</a> --}}
            <div class="">{{ $chat_room->getPartner()->name }}</div>
            <time>{{ $chat_room->updated_at }}</time>
        </li>
    @endforeach
    </ul>

    
</div>

@endsection

@section('style')
    <link href="{{ asset('css/chat.css') }}" rel="stylesheet">
@endsection

@section('script')
    {{-- <script src="{{ asset('js/chat.js') }}" defer></script> --}}
    <script src="{{ asset('js/test.js') }}" defer></script>
@endsection