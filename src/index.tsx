/* eslint-disable import/prefer-default-export */
import {
  addons,
  makeDecorator,
  WrapperSettings,
  StoryWrapper,
} from '@storybook/addons';

import { DEFAULT_PADDING, EVENTS, PARAM_KEY } from './constants';
import { getSelectedPadding, isEnabled } from './helpers';

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

const setPadding = (padding: string) => {
  state.padding = padding;
  setStyle(padding);
};

const render = (
  settings: WrapperSettings,
  storyFn: () => ReturnType<StoryWrapper>,
) => {
  const { parameters: options = {} } = settings;
  const channel = addons.getChannel();

  if (!state.initialized) {
    channel.on(EVENTS.UPDATE, setPadding);
    state.initialized = true;
  }

  const currentValue = isEnabled(options) ? state.padding : DEFAULT_PADDING;
  setStyle(getSelectedPadding(options, currentValue));

  return storyFn();
};

const wrapper: StoryWrapper = (getStory, context, settings) =>
  render(settings, () => getStory(context));

export const withPaddings = makeDecorator({
  name: 'withPaddings',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper,
});
