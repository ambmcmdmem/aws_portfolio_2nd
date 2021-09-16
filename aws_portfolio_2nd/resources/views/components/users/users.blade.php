{{-- ユーザー検索ページ（同期処理） --}}
{{-- 見つかった場合 --}}
@if ($users)
<ul>
    @foreach ($users as $user)
    <li>{{ $user->name }}</li>
    @endforeach
</ul>
{{-- 見つからなかった --}}
@else
見つかりませんでした。
@endif
