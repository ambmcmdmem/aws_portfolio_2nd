@extends('layouts.app')

@section('content')
{{-- ユーザー検索ページ（同期処理） --}}
<a href="{{ route('index') }}">もどる</a>
{{-- 見つかった場合 --}}
@if (count($users))
以下のユーザーが見つかりました。
<ul>
    @foreach ($users as $user)
    <li>
        <img src="{{ $user->avatar }}" alt="{{ $user->username }} アバター" width="60">
        <button id="user_link_{{ $user->id }}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#user_modal_{{ $user->id }}">
            {{ $user->name }}
        </button>
        <!-- Modal -->
        <div class="modal fade" id="user_modal_{{ $user->id }}" tabindex="-1" aria-labelledby="user_modal_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="user_modal_label">Modal title</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <form action="{{ route('chatrooms.create') }}" method="POST">
                            @csrf
                            <input type="hidden" name="user_id" value="{{ $user->id }}">
                            <button type="submit" class="btn btn-primary">追加する</button>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </li>
    
    @endforeach
</ul>
{{-- 見つからなかった --}}
@else
見つかりませんでした。
@endif

@endsection

@section('script')
<script type="text/javascript" src="{{ asset('js/users/search.js') }}" defer></script>
@endsection