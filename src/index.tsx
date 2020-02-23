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

const state = store({ padding: '' });
const setPadding = (padding: string) => { state.padding = padding; };

const bodyClass = 'sb-show-main';

const Story: FC<Props> = view(({
  getStory,
  context,
  settings: {
    parameters: {
      disabled = false,
    } = {},
  },
}) => {
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
