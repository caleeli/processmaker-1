export default {
    data() {
        return {
            smallWidth: window.innerWidth < 768,
        };
    },
    methods: {
        updateScreenSize() {
            // Update the screen size
            this.smallWidth = window.innerWidth < 768;
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
