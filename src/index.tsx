/* eslint-disable import/prefer-default-export */
import { addons, makeDecorator, StoryWrapper } from '@storybook/addons';
import { DEFAULT_PADDING, EVENTS, PARAM_KEY } from './constants';
import { getSelectedPadding } from './helpers';

const state: {
  initialized: boolean;
  padding?: string;
} = {
  initialized: false,
};

const setStyle = (padding = DEFAULT_PADDING) => {
  document.body.style.padding = padding;
  document.body.style.transition = 'padding .3s';
};

const render = (storyFn: () => ReturnType<StoryWrapper>) => {
  const channel = addons.getChannel();

  if (!state.initialized) {
    channel.on(EVENTS.UPDATE, ({ values, selectedPadding }) => {
      setStyle(getSelectedPadding(values, selectedPadding));
    });
    state.initialized = true;
  }

  return storyFn();
};

const wrapper: StoryWrapper = (getStory, context) =>
  render(() => getStory(context));

export const withPaddings = makeDecorator({
  name: 'withPaddings',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper,
});
