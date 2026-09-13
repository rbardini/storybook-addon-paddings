import addonDocs from '@storybook/addon-docs'
import { definePreview } from '@storybook/react-vite'

import paddings from '../dist/index.js'

export default definePreview({
  addons: [addonDocs(), paddings()],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
})
