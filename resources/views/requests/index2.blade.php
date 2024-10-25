@extends('layouts.app')

@section('head')
<title>@yield('title', 'Requests')</title>
@endsection

@section('content')
@vite('resources/requests/Requests.js')
<x-common.layout :user="$currentUser">
    <div class="flex sm:mx-6 sm:mt-6 sm:space-x-6">
        <counter-card
            color="primary"
            count="101"
            icon="chart-line"
            title="My Requests"
            link="/requests"
        ></counter-card>
        <counter-card
            color="light"
            count="101"
            title="My Tasks"
            icon="tasks"
            link="/tasks"
        ></counter-card>
    </div>
    <requests></requests>
</x-common.layout>
@endsection