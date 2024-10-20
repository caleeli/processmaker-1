<template>
    <span class="inline-block w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-300">
        <img v-if="user?.avatar" :src="user.avatar" :alt="user.fullname" class="w-full h-full object-cover bg-gray-300">
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 font-semibold">
            {{ user?.firstname.charAt(0) }}
            {{ user?.lastname.charAt(0) }}
        </div>
    </span>
</template>

<script lang="ts" setup>

defineProps<{ user: { avatar: string, firstname: string, lastname: string, fullname: string } | null }>();

</script>
