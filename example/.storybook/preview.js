import { addDecorator, addParameters } from '@storybook/react';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);

addParameters({
  paddings: {
    values: [
      { name: 'small', value: '16px' },
      { name: 'medium', value: '32px' },
      { name: 'large', value: '64px' },
    ],
    default: 'medium'
  }
});
