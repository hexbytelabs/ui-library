import type { Preview } from '@storybook/react'
import "../lib/style.css"

const preview: Preview = {
  tags: ['autodocs', '!dev'],
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
