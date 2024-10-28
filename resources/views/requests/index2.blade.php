@extends('layouts.app')

@section('head')
<title>@yield('title', 'Requests')</title>
@endsection

@section('content')
@vite('resources/requests/Requests.js')
<x-common.layout :user="$currentUser">
    <requests></requests>
</x-common.layout>
@endsection