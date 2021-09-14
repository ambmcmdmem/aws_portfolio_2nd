@extends('layouts.app')

@section('content')

<div class="container">

<ul>
@foreach(auth()->user()->chat_rooms as $chat_room)
    <li>
        <img src="{{ $chat_room->getPartner()->avatar }}" alt="" width="60">
        <a href="{{route('chatrooms.app', $chat_room)}}">{{ $chat_room->getPartner()->name }}</a>
        <time>{{ $chat_room->updated_at }}</time>
    </li>
@endforeach
</ul>

</div>

@endsection