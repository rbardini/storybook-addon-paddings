import { addParameters } from '@storybook/react';

addParameters({
  paddings: [
    { name: 'Small', value: '16px' },
    { name: 'Medium', value: '32px', default: true },
    { name: 'Large', value: '64px' },
  ],
});
