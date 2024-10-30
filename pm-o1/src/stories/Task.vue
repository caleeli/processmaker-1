<template>
    <div class="flex flex-col h-full">
        <div class="flex items-end justify-end p-6">
            <button @click="goBack"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                Back
            </button>
        </div>

        <iframe :src="`/tasks/${taskId}/open`" class="w-full flex-1 border-0" title="Task"></iframe>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        taskId: {
            type: Number,
            required: true,
        },
    },
    methods: {
        goBack() {
            const previousPage = window.history.state ? window.history.state.previousPage : null;
            if (previousPage) {
                window.location.href = previousPage;
            } else {
                window.location.href = '/cases';
            }
        },
    }
};
</script>
