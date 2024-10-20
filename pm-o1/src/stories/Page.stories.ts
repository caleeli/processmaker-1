import type { Meta, StoryObj } from '@storybook/vue3';

import MyPage from './Page.vue';

const meta = {
  title: 'Example/Page',
  component: MyPage,
  render: (args: any) => ({
    components: { MyPage },
    setup() {
      return { args };
    },
    template: '<my-page :user="args.user" />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof MyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  args: {
    user: {
      fullname: 'Jane Doe',
      firstname: 'Jane',
      lastname: 'Doe',
      avatar: 'https://avataaars.io/?avatarStyle=Transparent',
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};
