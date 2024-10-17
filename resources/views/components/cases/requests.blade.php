@vite('resources/requests/index.js')
<div id="Requests"></div>
@push('scripts')
<script type="module">
    window.ProcessMaker.mountComponent('Requests', '#Requests', {});
</script>
@endpush