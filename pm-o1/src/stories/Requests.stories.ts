import type { Meta, StoryObj } from '@storybook/vue3';

import Requests from './Requests.vue';

// Mock GET /requests?include=process,participants,activeTasks&page=1&per_page=3


const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Requests',
  component: Requests,
  render: (args: any) => ({
    components: { Requests },
    setup() {
      return { args };
    },
    template: '<Requests  />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    mockData: [
      // mock data for the tabs
      {
        url: '/requests?include=process,participants,activeTasks&page=1&per_page=3',
        method: 'GET',
        status: 200,
        response: {
          data: {
            data:[],
            meta: {
              total: 0,
              per_page: 3,
              page: 1,
              last_page: 1,
            },
          },
        },
      },
    ],
  },
  args: {
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Requests>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    value: true
  },
};

