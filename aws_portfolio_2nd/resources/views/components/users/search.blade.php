{{-- ユーザー検索ページ（同期処理） --}}

<div class="modal fade" id="user_search_modal" tabindex="-1" aria-labelledby="user_modal_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="user_modal_label">このユーザーが見つかりました！</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="{{ $user->avatar }}" alt="{{ $user->username }} アバター" width="60">
                <div>{{ $user->username }}</div>
                <div>{{ $user->name }}</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                {{-- このユーザーがパートナーであれば --}}
                @if(auth()->user()->is_partner($user))
                    <div class="btn btn-secondary">追加済み</div>
                @else
                    <form action="{{ route('chatrooms.create') }}" method="POST">
                        @csrf
                        <input type="hidden" name="user_id" value="{{ $user->id }}">
                        <button type="submit" class="btn btn-primary">追加する</button>                            
                    </form>
                @endif
            </div>
        </div>
    </div>
</div>
