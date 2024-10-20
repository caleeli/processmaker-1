<template>
    <header class="flex items-center justify-between bg-white px-6 py-4 shadow border-b border-gray-200">
        <!-- Menu Toggle Button for Small Screens -->
        <button @click="toggleMenu" class="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Left Side (Menu Options) -->
        <nav :class="['flex-col md:flex-row md:flex space-x-4', menuOpen ? 'flex' : 'hidden', 'md:flex']" class="space-y-2 md:space-y-0">
            <a href="#" class="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" class="text-gray-600 hover:text-gray-800">Processes</a>
            <a href="#" class="text-gray-600 hover:text-gray-800">Requests</a>
            <a href="#" class="text-gray-600 hover:text-gray-800">Tasks</a>
            <a href="#" class="text-gray-600 hover:text-gray-800">Designer</a>
            <a href="#" class="text-gray-600 hover:text-gray-800">Admin</a>
        </nav>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <i class="fas fa-plus mr-2"></i>
                Case
            </button>
            <button class="relative">
                <!-- Notification Icon -->
                <svg class="w-6 h-6 text-gray-600 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <!-- Bell Icon Path -->
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 17h5l-1.405-1.405C18.79 14.975 19 13.99 19 13V9a7 7 0 00-14 0v4c0 .99.21 1.975.595 2.595L4 17h5m6 0v2a2 2 0 11-4 0v-2h4z" />
                </svg>
                <!-- Notification Dot -->
                <span class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            <!-- User Avatar Dropdown -->
            <div class="relative">
                <button @click="toggleDropdown" class="flex items-center focus:outline-none">
                    <!-- Replace with actual user image -->
                    <img :src="user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full">
                </button>
                <transition name="fade">
                    <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit Profile</a>
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Documentation</a>
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dropdownOpen: false,
            menuOpen: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
    },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
