import { addDecorator, addParameters } from '@storybook/react';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);

addParameters({
  paddings: {
    values: {
      small: { name: 'Small', value: '16px' },
      medium: { name: 'Medium', value: '32px' },
      large: { name: 'Large', value: '64px' },
    },
    default: 'medium'
  }
});
