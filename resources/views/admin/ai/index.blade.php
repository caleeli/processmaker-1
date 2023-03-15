@extends('layouts.layout')

@section('title')
    {{__('AI configs')}}
@endsection

@section('sidebar')
    @include('layouts.sidebar', ['sidebar'=> Menu::get('sidebar_admin')])
@endsection

@section('breadcrumbs')
    @include('shared.breadcrumbs', ['routes' => [
        __('Admin') => route('admin.index'),
        __('AI configs') => null,
    ]])
@endsection
@section('content')
    <div id="ai-configs" class="px-3">
        <ai-configs></ai-configs>

        <ai-ratings></ai-ratings>
    </div>
@endsection

@section('js')
    <script src="{{mix('js/admin/ai/index.js')}}"></script>
@endsection
