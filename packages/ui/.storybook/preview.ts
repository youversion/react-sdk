import type { Preview } from '@storybook/react-webpack5'

import '../src/globals.css'; // Adjust path to your CSS file

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
