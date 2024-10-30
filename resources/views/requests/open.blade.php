@extends('layouts.app')

@section('head')
<title>@yield('title', 'Request')</title>
@endsection

@section('content')
@vite('resources/case.js')
<x-common.layout :user="$currentUser" :data="['request' => $request]">
    <case :case-data="data.request"></case>
</x-common.layout>
@endsection