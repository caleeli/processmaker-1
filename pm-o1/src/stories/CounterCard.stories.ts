import type { Meta, StoryObj } from '@storybook/vue3';
import CounterCard from './CounterCard.vue';

const meta = {
    title: 'Example/CounterCard',
    component: CounterCard,
    render: (args: any) => ({
        components: { CounterCard },
        setup() {
            return { args };
        },
        template: '<CounterCard v-bind="args" />',
    }),
    parameters: {
        layout: 'fullscreen',
        mockData: [
            // Mock data for API requests if needed
            {
                url: '/api/count',
                method: 'GET',
                status: 200,
                response: {
                    data: {
                        meta: {
                            total: 100,
                        },
                    },
                },
            },
        ],
    },
    args: {
        title: 'Total Users',
        color: 'primary',
        icon: 'users',
        count: 150,
        link: '/users',
        url: '/api/count',
        countId: null,
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CounterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithCustomCount: Story = {
    args: {
        count: 250,
    },
};

export const WithDynamicCount: Story = {
    args: {
        count: null,
        url: '/api/count',
    },
    parameters: {
        mockData: [
            {
                url: '/api/count',
                method: 'GET',
                status: 200,
                response: {
                    data: {
                        meta: {
                            total: 300,
                        },
                    },
                },
            },
        ],
    },
};

export const WithDifferentColor: Story = {
    args: {
        color: 'success',
    },
};

export const WithIcon: Story = {
    args: {
        icon: 'chart-line',
    },
};

export const HiddenUntilLoaded: Story = {
    args: {
        count: null,
        url: '/api/count',
    },
    parameters: {
        mockData: [
            {
                url: '/api/count',
                method: 'GET',
                status: 200,
                response: {
                    data: {
                        meta: {
                            total: 500,
                        },
                    },
                },
            },
        ],
    },
};
