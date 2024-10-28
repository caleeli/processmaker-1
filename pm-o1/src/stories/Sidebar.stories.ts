import type { Meta, StoryObj } from '@storybook/vue3';

import Sidebar from './Sidebar.vue';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Sidebar',
  component: Sidebar,
  render: (args: any) => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: '<Sidebar :value="args.value" :menu="args.menu" @input="args.value = $event" />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    value: true,
    menu: [
      { "title": "Home", "beforeHTML": null, "afterHTML": null, "nickname": "home", "divider": [], "attributes": { "id": "home", "class": null }, "isActive": false },
      { "title": "Processes", "beforeHTML": null, "afterHTML": null, "nickname": "processes", "divider": [], "attributes": { "id": "process-browser", "class": null }, "isActive": false },
      { "title": "Requests", "beforeHTML": null, "afterHTML": null, "nickname": "requests", "divider": [], "attributes": { "id": "requests", "class": "active" }, "isActive": true },
      { "title": "Tasks", "beforeHTML": null, "afterHTML": null, "nickname": "tasks", "divider": [], "attributes": { "id": "tasks", "class": null }, "isActive": false },
      { "title": "Designer", "beforeHTML": null, "afterHTML": null, "nickname": "designer", "divider": [], "attributes": { "id": "designer", "class": null }, "isActive": false },
      { "title": "Admin", "beforeHTML": null, "afterHTML": null, "nickname": "admin", "divider": [], "attributes": { "id": "admin", "class": null }, "isActive": false }
    ],
  },
};

