@vite('resources/common/TopMenu.js')
<div id="topmenu"></div>
@push('scripts')
@vue('TopMenu', '#topmenu', ['user' => $user])
@endpush