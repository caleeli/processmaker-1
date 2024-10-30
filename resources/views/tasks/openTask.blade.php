@extends('layouts.app')

@section('head')
<title>@yield('title', 'Task')</title>
@endsection

@section('content')
@vite('resources/task.js')
<x-common.layout :user="$currentUser" :data="['taskId' => $taskId]">
    <task :task-id="data.taskId"></task>
</x-common.layout>
@endsection