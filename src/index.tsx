/* eslint-disable import/prefer-default-export */
import React, { FC, useEffect } from 'react';
import {
  addons, makeDecorator, WrapperSettings, StoryGetter, StoryContext,
} from '@storybook/addons';

import { EVENTS, PARAM_KEY } from './constants';

type Props = {
  getStory: StoryGetter;
  context: StoryContext;
  settings: WrapperSettings;
}

const Story: FC<Props> = ({
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
    const onUpdate = ({ selected }: any) => {
      document.body.style.padding = selected;
    };

    document.body.style.transition = 'padding .3s';
    channel.on(EVENTS.UPDATE, onUpdate);

    return () => channel.off(EVENTS.UPDATE, onUpdate);
  }, []);

  return getStory(context);
};

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
