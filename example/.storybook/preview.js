import { addDecorator, addParameters } from '@storybook/react';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);

addParameters({
  paddings: {
    values: [
      { key: 'sm', name: 'Small', value: '16px' },
      { key: 'md', name: 'Medium', value: '32px' },
      { key: 'lg', name: 'Large', value: '64px' },
    ],
    default: 'md'
  }
});
