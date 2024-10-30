import type { Meta, StoryObj } from '@storybook/vue3';
import Task from './Task.vue';

const meta: Meta<typeof Task> = {
    title: 'Example/Task',
    component: Task,
    render: (args: any) => ({
        components: { Task },
        setup() {
            return { args };
        },
        template: '<Task v-bind="args" />',
    }),
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        taskId: 1,
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        taskId: 1,
    },
};
