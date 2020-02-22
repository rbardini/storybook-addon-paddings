/* eslint-disable import/prefer-default-export */
import React, { FC, useEffect } from 'react';
import { store, view } from 'react-easy-state';
import {
  addons, makeDecorator, WrapperSettings, StoryGetter, StoryContext,
} from '@storybook/addons';
import { Global } from '@storybook/theming';

import { EVENTS, PARAM_KEY } from './constants';
import { GlobalState } from './containers/PaddingSelector';

const state = store({ padding: '' });
const setPadding = (padding: string) => { state.padding = padding; };

const bodyClass = 'sb-show-main';

type Props = {
  getStory: StoryGetter;
  context: StoryContext;
  settings: WrapperSettings;
}

const Story: FC<Props> = view(({
  getStory,
  context,
  settings: {
    parameters: {
      disabled = false,
    } = {},
  },
}) => {
  const story = getStory(context);

  useEffect(() => {
    const channel = addons.getChannel();
    const onUpdate = ({ selected }: GlobalState) => setPadding(selected);

    channel.on(EVENTS.UPDATE, onUpdate);

    return () => channel.off(EVENTS.UPDATE, onUpdate);
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
      {story}
    </>
  );
});

export const withPaddings = makeDecorator({
  name: 'withPaddings',
  parameterName: PARAM_KEY,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, settings) => (
    <Story
      getStory={getStory}
      context={context}
      settings={settings}
    />
  ),
});
