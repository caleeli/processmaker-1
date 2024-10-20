<template>
    <div class="shimmer-loader-wrapper" :class="{ loading: isLoading }">
        <slot />
        <div v-if="isLoading" class="shimmer-overlay"></div>
    </div>
</template>

<script>
export default {
    name: 'ShimmerLoader',
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.shimmer-loader-wrapper {
    position: relative;
}

/* The overlay that appears over the content when loading */
.shimmer-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Shimmer effect styles */
    background: linear-gradient(to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0) 100%);
    background-repeat: no-repeat;
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    pointer-events: none;
    /* Allows clicks to pass through when not loading */
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

/* Optional: Add a class to dim the content when loading */
.loading {
    opacity: 0.6;
}
</style>
