import React from 'react';
import { styled } from '@storybook/theming';

const Card = styled.div({
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 20px 40px rgba(0, 0, 0, .3)',
  display: 'inline-block',
  fontFamily:
    '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
  lineHeight: 1.4,
  padding: 80,
  textAlign: 'center',
});

export default {
  title: 'Card',
  component: Card,
  parameters: { paddings: { disable: true } },
};

const Template = (args) => <Card {...args} />;

export const Elevated = Template.bind({});
Elevated.args = {
  children:
    'I’m a big Card flying high. You may never know how far I cast shadows unless you add some paddings around.',
};
