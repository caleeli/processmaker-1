@vite('resources/case.js')
<div id="Case"></div>
@push('scripts')
<script type="module">
    window.ProcessMaker.mountComponent('Case', '#Case', {
        caseData: @json($caseData)
    });
</script>
@endpush