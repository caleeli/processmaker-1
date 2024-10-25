@vite('resources/common/Layout.js')
<div id="LayoutA">
    <Layout v-bind:user="user">
        {{ $slot }}
    </Layout>
</div>
@push('scripts')
<script type="module">
    window.ProcessMaker.mountApp('#LayoutA', {
        data() {
            return {
                user: @json($user),
            }
        },
    });
</script>
@endpush