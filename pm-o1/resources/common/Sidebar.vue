<template>
    <aside :class="['bg-gray-800 text-white h-full flex flex-col', sidebarOpen ? 'w-64' : 'w-20']"
        class="transition-all duration-300 overflow-hidden">
        <div class="p-4 text-xl font-semibold flex items-center justify-between">
            <img src="../../../resources/img/processmaker-icon.svg" alt="ProcessMaker" width="40">
        </div>
        <nav class="mt-6 flex-1" :class="{ 'text-sm': !sidebarOpen }">
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center"
                :class="sidebarOpen ? 'justify-start' : 'justify-center'">
                <i class="text-lg fa fa-home mr-3"></i>
                <span v-if="sidebarOpen" class="transition-opacity duration-300">Started by me</span>
            </a>
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center"
                :class="sidebarOpen ? 'justify-start' : 'justify-center'">
                <i class="text-lg fas fa-spinner mr-3"></i>
                <span v-if="sidebarOpen" class="transition-opacity duration-300">In Progress</span>
            </a>
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center"
                :class="sidebarOpen ? 'justify-start' : 'justify-center'">
                <i class="text-lg fas fa-check-circle mr-3"></i>
                <span v-if="sidebarOpen" class="transition-opacity duration-300">Completed</span>
            </a>
            <a href="#" class="block py-2.5 px-4 hover:bg-gray-700 flex items-center"
                :class="sidebarOpen ? 'justify-start' : 'justify-center'">
                <i class="text-lg fas fa-folder-open mr-3"></i>
                <span v-if="sidebarOpen" class="transition-opacity duration-300">All Cases</span>
            </a>
        </nav>
        <div class="p-4">
            <button @click="toggleSidebar" class="focus:outline-none">
                <i :class="['fas', sidebarOpen ? 'fa-angle-left' : 'fa-angle-right']"></i>
            </button>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            sidebarOpen: false,
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
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
</style>