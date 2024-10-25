import type { Preview } from "@storybook/vue3";
import '../resources/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css'
import { setup } from '@storybook/vue3'

const commonMixin = {
  methods: {
    $t(text){
      return text
    }
  },
};

setup((app) => {
  app.mixin(commonMixin);
});

window.ProcessMaker = {
  apiClient: {
    get: (url: string) => {
      return fetch(url).then((response) => {
        return response.json();
      });
    }
  }
};
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
