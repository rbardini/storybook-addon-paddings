import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './Card'

type Story = StoryObj<typeof Card>

const meta: Meta<typeof Card> = {
  title: 'Example',
  component: Card,
}

export default meta

export const PresetOptions: Story = {
  args: {
    children: 'This story uses preset padding options. (Small, Medium & Large)',
  },
}

export const CustomOptions: Story = {
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
}

export const DefaultOption: Story = {
  args: {
    children: 'This story sets a default padding option. (Medium)',
  },
  parameters: {
    paddings: { default: 'Medium' },
  },
}

export const Disabled: Story = {
  args: {
    children: 'This story disables paddings.',
  },
  parameters: {
    paddings: { disable: true },
  },
}
