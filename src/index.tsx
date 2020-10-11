/* eslint-disable import/prefer-default-export */
import { StoryWrapper, useMemo } from '@storybook/addons';

import { DEFAULT_PADDING, PARAM_KEY } from './constants';
import { normalizeValues, getSelectedPadding } from './helpers';

const setStyle = (padding = DEFAULT_PADDING) => {
  document.body.style.padding = padding;
  document.body.style.transition = 'padding .3s';
};

export const withPaddings: StoryWrapper = (getStory, context) => {
  const { globals, parameters } = context;
  const globalsSelectedPadding = globals[PARAM_KEY]?.value;
  const paddingsConfig = parameters[PARAM_KEY];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useMemo(() => {
    const selectedPadding = getSelectedPadding(
      normalizeValues(paddingsConfig),
      globalsSelectedPadding,
    );
    setStyle(selectedPadding);
  }, [paddingsConfig, globalsSelectedPadding]);

  return getStory(context);
};

export default withPaddings;
