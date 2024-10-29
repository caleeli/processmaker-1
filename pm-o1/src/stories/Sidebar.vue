<template>
    <aside
        :class="['bg-gray-800 text-white h-full flex flex-col transition-all duration-300 sidebar', sidebarOpen ? 'pr-6' : 'closed']"
        aria-label="Sidebar navigation">
        <nav class="mt-6 flex-1 space-y-2">
            <a
                v-for="item in menu"
                :href="url(item)"
                class="flex items-center py-2.5 px-4 hover:bg-gray-700 transition-colors"
                :aria-expanded="sidebarOpen"
            >
                <i :class="`${icon(item)} text-lg`"></i>
                <span v-show="showText" class="ml-3 transition-opacity duration-300">{{ item.title }}</span>
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
import Menu from "./Menu";

// Menu icons
const icons: { [key: string]: string } = {
    home: 'fa fa-home',
    tasks: 'fa fa-tasks',
    processes: 'fa fa-cogs',
    requests: 'fa fa-briefcase',
    cases: 'fa fa-briefcase',
    designer: 'fa fa-paint-brush',
    admin: 'fa fa-user-cog',
    _default: 'fa fa-question',
};

export default {
    props: {
        value: {
            type: Boolean,
        },
        menu: {
            type: Array as () => Menu[],
            default: () => [],
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
        icon(menu: Menu) {
            return icons[menu.nickname] || icons._default;
        },
        url(menu: Menu) {
            return `/${menu.attributes.id}`;
        },
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