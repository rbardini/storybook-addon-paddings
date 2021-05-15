import React from 'react';
import Card from './Card';

export default {
  title: 'Example',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const PresetOptions = Template.bind({});
PresetOptions.args = {
  children: 'This story uses preset padding options.',
};

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  children: 'This story uses custom padding options.',
};
CustomOptions.parameters = {
  paddings: {
    values: [
      { name: 'xs', value: '8px' },
      { name: 'sm', value: '16px' },
      { name: 'md', value: '24px' },
      { name: 'lg', value: '32px' },
      { name: 'xl', value: '48px' },
    ],
  },
};

export const DefaultOption = Template.bind({});
DefaultOption.args = {
  children: 'This story sets a default padding option.',
};
DefaultOption.parameters = {
  paddings: { default: 'Medium' },
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'This story disables paddings.',
};
Disabled.parameters = {
  paddings: { disable: true },
};
