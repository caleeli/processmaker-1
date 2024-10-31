<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ \ProcessMaker\Models\Setting::getFavicon() }}">

    <!-- Title Section -->
    @yield('head')
    <style>
        .html, body {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            padding: 0;
            margin: 0;
        }
    </style>
    @viteRenderStyleAssets()
</head>
<body>
    <!-- Main Content Section -->
    @yield('content')

    <!-- Scripts -->
    @viteRenderScriptAssets()
    @yield('scripts')
    @stack('scripts')
    @include('shared.preload')
</body>
</html>