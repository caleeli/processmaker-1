<template>
    <div :class="['flex flex-row border-0 p-4', cardClass]">
        <!-- Header -->
        <div :class="headerClass">
            <i :class="['fas fa-2x', iconClass]"></i>
        </div>
        <!-- Body -->
        <a :href="link">
            <div v-if="showCount" :class="['m-0', 'font-bold', 'text-3xl sm:text-5xl', 'leading-tight']">{{ currentCount }}</div>
            <div class="leading-tight">{{ $t(title) }}</div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentCount: null,
            loaded: true,
        };
    },
    props: {
        color: {
            type: String,
            default: 'secondary',
        },
        count: {
            type: Number,
            default: null,
        },
        countId: {
            default: null,
        },
        icon: {
            type: String,
            default: 'chart-line',
        },
        link: {
            type: String,
            default: '/',
        },
        title: {
            type: String,
            default: 'Count',
        },
        url: {
            type: String,
            default: null,
        },
    },
    mounted() {
        this.loadCount();
    },
    computed: {
        cardClass() {
            let classes = [];
            if (!this.loaded) {
                classes.push('hidden');
            }
            classes.push(this.bgColorClass);
            return classes;
        },
        headerClass() {
            return [
                'pr-4',
                'hidden sm:!block',
                'lg:flex',
                'items-center',
                'justify-center',
                'border-0',
            ];
        },
        bgColorClass() {
            const colorMap = {
                primary: 'bg-blue-500 text-gray-200',
                secondary: 'bg-gray-500 text-gray-200',
                success: 'bg-green-500 text-gray-200',
                danger: 'bg-red-500 text-gray-200',
                warning: 'bg-yellow-500 text-gray-200',
                info: 'bg-teal-500 text-gray-200',
                light: 'bg-gray-200 text-gray-800',
                dark: 'bg-gray-800 text-gray-200',
            };
            return colorMap[this.color] || 'bg-gray-500';
        },
        iconClass() {
            return 'fa-' + this.icon;
        },
        isInGroup() {
            return this.$parent.$options._componentTag === 'counter-card-group';
        },
        showCount() {
            return this.currentCount !== null;
        },
    },
    methods: {
        loadCount() {
            if (this.count !== null) {
                this.currentCount = this.count;
            } else if (this.url !== null) {
                if (!this.isInGroup) {
                    ProcessMaker.apiClient
                        .get(this.url)
                        .then((response) => {
                            this.setCount(response.data.meta.total);
                        })
                        .catch(() => {
                            this.show();
                        });
                }
            }
        },
        setCount(count) {
            this.currentCount = count;
            this.show();
        },
        show() {
            this.loaded = true;
        },
    },
};
</script>