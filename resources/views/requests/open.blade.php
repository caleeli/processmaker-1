@extends('layouts.app')

@section('head')
<title>@yield('title', 'Request')</title>
@endsection

@section('content')
@vite('resources/requests/Requests.js')
<x-common.layout :user="$currentUser">
    <x-cases.case :case-data="$request"></x-cases.case>
</x-common.layout>
@endsection