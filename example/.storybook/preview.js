import { withPaddings } from 'storybook-addon-paddings';

export const decorators = [withPaddings];

export const parameters = {
  paddings: [
    { name: 'Small', value: '16px' },
    { name: 'Medium', value: '32px', default: true },
    { name: 'Large', value: '64px' },
  ],
};
