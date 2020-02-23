/* eslint-disable import/prefer-default-export */
import React, { FC, useEffect } from 'react';
import { store, view } from 'react-easy-state';
import {
  addons, makeDecorator, WrapperSettings, StoryGetter, StoryContext,
} from '@storybook/addons';
import { Global } from '@storybook/theming';

import { EVENTS, PARAM_KEY } from './constants';

type Props = {
  getStory: StoryGetter;
  context: StoryContext;
  settings: WrapperSettings;
}

const state = store({ initialized: false, padding: '' });
const setPadding = (padding = '') => {
  if (!state.initialized) state.initialized = true;
  state.padding = padding;
};

const bodyClass = 'sb-show-main';

const Story: FC<Props> = view(({
  getStory,
  context,
  settings: {
    parameters = {},
  },
}) => {
  const { disabled = false } = parameters;

  useEffect(() => {
    // PaddingSelector emits the default selection before this wrapper
    // can subscribe to the channel, so manually set initial padding on
    // first render. This workaround should be removed once we can share
    // state between manager and preview.
    // See https://github.com/storybookjs/storybook/pull/9079
    if (!state.initialized) {
      const defaultValue = Array.isArray(parameters)
        ? parameters.find((param) => param.default)?.value
        : undefined;

      setPadding(defaultValue);
    }
  }, [parameters]);

  useEffect(() => {
    const channel = addons.getChannel();

    channel.on(EVENTS.UPDATE, setPadding);

    return () => channel.off(EVENTS.UPDATE, setPadding);
  }, []);

  return (
    <>
      <Global
        styles={{
          [`.${bodyClass}`]: {
            padding: !disabled && state.padding,
            transition: 'padding .3s',
          },
        }}
      />
      {getStory(context)}
    </>
  );
});

export const withPaddings = makeDecorator({
  name: 'withPaddings',
  parameterName: PARAM_KEY,
  allowDeprecatedUsage: true,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, settings) => (
    <Story
      getStory={getStory}
      context={context}
      settings={settings}
    />
  ),
});
