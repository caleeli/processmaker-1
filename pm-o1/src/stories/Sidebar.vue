<template>
    <aside
        :class="['bg-gray-800 text-white h-full flex flex-col transition-all duration-300 sidebar', sidebarOpen ? 'pr-6' : 'closed']"
        aria-label="Sidebar navigation">
        <nav class="mt-6 flex-1 space-y-2">
            <a href="#" class="flex items-center py-2.5 px-4 hover:bg-gray-700 transition-colors"
                :aria-expanded="sidebarOpen">
                <i class="fa fa-home text-lg"></i>
                <span v-show="showText" class="ml-3 transition-opacity duration-300">Started by me</span>
            </a>

            <a href="#" class="flex items-center py-2.5 px-4 hover:bg-gray-700 transition-colors"
                :aria-expanded="sidebarOpen">
                <i class="fas fa-spinner text-lg"></i>
                <span v-show="showText" class="ml-3 transition-opacity duration-300">In Progress</span>
            </a>

            <a href="#" class="flex items-center py-2.5 px-4 hover:bg-gray-700 transition-colors"
                :aria-expanded="sidebarOpen">
                <i class="fas fa-check-circle text-lg"></i>
                <span v-show="showText" class="ml-3 transition-opacity duration-300">Completed</span>
            </a>

            <a href="#" class="flex items-center py-2.5 px-4 hover:bg-gray-700 transition-colors"
                :aria-expanded="sidebarOpen">
                <i class="fas fa-folder-open text-lg"></i>
                <span v-show="showText" class="ml-3 transition-opacity duration-300">All Cases</span>
            </a>
        </nav>

        <div class="p-4">
            <button @click="toggleSidebar" class="focus:outline-none" aria-label="Toggle sidebar">
                <i :class="['fas', sidebarOpen ? 'fa-angle-left' : 'fa-angle-right']"></i>
            </button>
        </div>
    </aside>
</template>

<script lang="ts">
export default {
    props: {
        value: {
            type: Boolean,
        },
    },
    data() {
        return {
            sidebarOpen: false,
            // detect width and show text if width is greater than 768px
            showText: window.innerWidth > 768,
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
            this.$emit('input', this.sidebarOpen);
        },
        updateScreenSize() {
            this.showText = window.innerWidth > 768;
        },
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.sidebarOpen = value;
            },
        },
    },
    mounted() {
        this.updateScreenSize();
        window.addEventListener('resize', this.updateScreenSize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateScreenSize);
    },
};
</script>

<style>
.sidebar {
    max-width: 100%;
    text-wrap: nowrap;
}
.closed {
    max-width: 0;
}
</style>