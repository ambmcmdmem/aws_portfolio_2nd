@extends('layouts.app')


@section('content')

<div id="chat_app_container" class="container">
    <a href="{{ route('users.index') }}">戻る</a>

    @include('components.chat.app', compact('chatRoom'))

    {{-- <form action="{{ route('chatrooms.create', $chatRoom) }}" method="POST" enctype="multipart/form-data"> --}}
    {{-- </form> --}}
</div>

@endsection

@section('style')
    <link href="{{ asset('css/chat.css') }}" rel="stylesheet">
@endsection

@section('script')
    <script src="{{ asset('js/chat.js') }}" defer></script>
    <script src="{{ asset('js/test.js') }}" defer></script>
@endsection