@vite('resources/common/Layout.js')
<div id="LayoutA">
    <Layout v-bind:user="user" :menu="menu">
        {{ $slot }}
    </Layout>
</div>
@push('scripts')
<?php
    $items = Menu::get('topnav')->items->all();
?>
<script type="module">
    window.ProcessMaker.mountApp('#LayoutA', {
        data() {
            return {
                user: @json($user),
                menu: @json($items ?? []),
                data: @json($data ?? []),
            }
        },
    });
</script>
@endpush