<template>
    <div class="spinner-overlay-wrapper">
        <slot />
        <div v-if="isLoading" class="spinner-overlay">
            <div class="spinner"></div>
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpinnerOverlay',
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.spinner-overlay-wrapper {
    position: relative;
}

/* The overlay that appears over the content when loading */
.spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 999;
}

/* Spinner styles */
.spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Accessibility for screen readers */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    border: 0;
}
</style>
