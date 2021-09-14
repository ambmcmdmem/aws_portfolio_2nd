@extends('layouts.app')

@section('content')

<div class="container">

@foreach(auth()->user()->chat_rooms as $chat_room)
    <a href="{{route('chatrooms.app', $chat_room)}}">{{ $chat_room->getPartner()->name }}</a>
    <br>
@endforeach

</div>

@endsection