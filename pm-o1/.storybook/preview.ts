import type { Preview } from "@storybook/vue3";
import '../resources/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
