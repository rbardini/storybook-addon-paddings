import preview from '../../.storybook/preview'

import { Card } from './Card'

const meta = preview.meta({
  title: 'Example',
  component: Card,
})

export const PresetOptions = meta.story({
  args: {
    children: 'This story uses preset padding options. (Small, Medium & Large)',
  },
})

export const CustomOptions = meta.story({
  args: {
    children: 'This story uses custom padding options. (xs, sm, md, lg & xl)',
  },
  parameters: {
    paddings: {
      values: [
        { name: 'xs', value: '8px' },
        { name: 'sm', value: '16px' },
        { name: 'md', value: '24px' },
        { name: 'lg', value: '32px' },
        { name: 'xl', value: '48px' },
      ],
    },
  },
})

export const DefaultOption = meta.story({
  args: {
    children: 'This story sets a default padding option. (Medium)',
  },
  parameters: {
    paddings: { default: 'Medium' },
  },
})

export const Disabled = meta.story({
  args: {
    children: 'This story disables paddings.',
  },
  parameters: {
    paddings: { disable: true },
  },
})
