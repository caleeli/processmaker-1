@extends('layouts.app')

@section('head')
<title>@yield('title', 'Requests')</title>
@endsection

@section('content')
<div class="flex h-full">
    <!-- Sidebar -->
    <x-common.sidebar :menu="$currentUser" />
    
    <!-- Main Content -->
    <div class="flex-1 min-h-screen bg-gray-100 flex flex-col" style="overflow:hidden">
        <!-- Top Menu -->
        <x-common.top-menu :user="$currentUser" />

        <!-- Content -->
        <main class="p-6 flex-1">
            <x-cases.requests />
        </main>
    </div>
</div>
@endsection