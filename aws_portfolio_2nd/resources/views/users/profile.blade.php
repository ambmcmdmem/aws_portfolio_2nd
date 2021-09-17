@extends('layouts.app')

@section('content')
<div class="container">
    <form action="" method="POST" enctype="multipart/form-data">
        @csrf
        @method('patch')
        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" type="text" name="username" value="{{ auth()->user()->username }}" required>
        </div>
        <div class="form-group">
            <label for="avatar">avatar</label>
            <input class="form-control" type="file" name="avatar">
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <input class="form-control" type="email" name="email" value="{{ auth()->user()->email }}" required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password">
        </div>
        <div class="form-group">
            <label for="password_confirmation">Password Confirmation</label>
            <input class="form-control" type="password" name="password_confirmation">
        </div>
    </form>
    <form id="user_delete_form" action="" method="POST">
        @csrf
        @method('delete')
        <button type="button" data-confirm="1" class="btn btn-danger">
            DELETE
        </button>
    </form>
</div>
@endsection

@section('script')
    <script src="{{ asset('js/common.js') }}" defer></script>
@endsection