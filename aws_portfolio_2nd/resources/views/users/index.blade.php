@extends('layouts.app')

@section('content')

<div class="container">

    <ul>
    @foreach(auth()->user()->chat_rooms as $chat_room)
        <li class="d-flex align-items-center">
            <img src="{{ $chat_room->getPartner()->avatar }}" alt="" width="60">
            {{-- <a href="{{route('chatrooms.app', $chat_room)}}">{{ $chat_room->getPartner()->name }}</a> --}}
            <div id="chat_room_{{ $chat_room->id }}" class="chat_room_link_item">{{ $chat_room->getPartner()->name }}</div>
            <time>{{ $chat_room->updated_at }}</time>
        </li>
    @endforeach
    </ul>

    
</div>

@endsection

@section('script')
    <script src="{{ asset('js/test.js') }}" defer></script>
@endsection