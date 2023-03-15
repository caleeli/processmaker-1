@extends('layouts.minimal')

@section('content')
  <div id="processPreview">
    <process-preview :text="{{ $text }}"></process-preview>
  </div>
@endsection

@section('js')
  <script src="{{ mix('js/manifest.js') }}"></script>
  <script src="{{ mix('js/vendor.js') }}"></script>
  <script src="{{ mix('js/app.js') }}"></script>
  <script src="{{ mix('js/processes/process-converter.js') }}"></script>
@endsection
