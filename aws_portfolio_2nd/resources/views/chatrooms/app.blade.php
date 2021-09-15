@extends('layouts.app')


@section('content')

<div id="chat_app_container" class="container">
    <a href="{{ route('users.index') }}">戻る</a>

    <ul id="chat_content_list" class="list">
    @foreach ($chatRoom->chat_contents as $chat_content)
        <li class="{{ $chat_content->return_chat_content_class() }}">
            <time class="d-block">{{ $chat_content->updated_at->diffForHumans() }}</time>

            @if ($chat_content->body)
                {{ $chat_content->body }}                
            @endif
            @if ($chat_content->post_image)
                <img src="{{ $chat_content->post_image }}" alt="" width=200>
            @endif
        </li>
    @endforeach
    </ul>

    {{-- <form action="{{ route('chatrooms.create', $chatRoom) }}" method="POST" enctype="multipart/form-data"> --}}
        @csrf
        <input id="new_chat_file" type="file" name="post_image" ondragover="onDragOver(event)" ondrop="onDrop(event)">
        <input id="new_chat_txt" type="text" name="body">
        <button id="new_chat_submit_btn" type="submit">
            送信
        </button>
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