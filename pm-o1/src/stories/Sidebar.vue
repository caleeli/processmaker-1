<template>
    <aside :class="['bg-gray-800 text-white h-full flex flex-col sidebar', sidebarOpen ? '' : 'closed']"
        class="transition-all duration-300">
        <nav class="mt-6 flex-1" :class="{ 'text-sm': showText }">
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center justify-start">
                <i class="text-lg fa fa-home mr-3"></i>
                <span v-if="showText" class="transition-opacity duration-300">Started by me</span>
            </a>
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center justify-start">
                <i class="text-lg fas fa-spinner mr-3"></i>
                <span v-if="showText" class="transition-opacity duration-300">In Progress</span>
            </a>
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center justify-start">
                <i class="text-lg fas fa-check-circle mr-3"></i>
                <span v-if="showText" class="transition-opacity duration-300">Completed</span>
            </a>
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center justify-start">
                <i class="text-lg fas fa-folder-open mr-3"></i>
                <span v-if="showText" class="transition-opacity duration-300">All Cases</span>
            </a>
        </nav>
        <div class="p-4">
            <button @click="toggleSidebar" class="focus:outline-none">
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
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Tailwind CSS is already applied */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fixed-height-row {
    height: 66px;
}
.sidebar {
    max-width: 100%;
    text-wrap: nowrap;
}
.closed {
    max-width: 0;
}
</style>