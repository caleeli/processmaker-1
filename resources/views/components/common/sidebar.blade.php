@vite('resources/common/Sidebar.js')
<div id="Sidebar"></div>
@push('scripts')
<script type="module">
    window.ProcessMaker.mountComponent('Sidebar', '#Sidebar', {
    });
</script>
@endpush