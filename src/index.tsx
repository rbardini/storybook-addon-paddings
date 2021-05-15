import { StoryWrapper, useEffect, useMemo } from '@storybook/addons';

import { DEFAULT_PADDING, PARAM_KEY } from './constants';
import { normalizeValues, getSelectedPadding } from './helpers';

const setStyle = (selector: string, css: string) => {
  const existingStyle = document.getElementById(selector);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;

    document.head.appendChild(style);
  }
};

export const withPaddings: StoryWrapper = (getStory, context) => {
  const { id, globals, parameters, viewMode } = context;
  const globalsSelectedPadding = globals[PARAM_KEY]?.value;
  const paddingsConfig = parameters[PARAM_KEY];
  const selector =
    viewMode === 'docs' ? `#anchor--${id} .docs-story > div` : '.sb-show-main';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const selectedPadding = useMemo(
    () =>
      getSelectedPadding(
        normalizeValues(paddingsConfig),
        globalsSelectedPadding,
      ) ?? DEFAULT_PADDING,
    [paddingsConfig, globalsSelectedPadding],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const paddingStyles = useMemo(
    () => `
      ${selector} {
        margin: 0;
        padding: ${selectedPadding} !important;
        transition: padding .3s;
      }

      ${selector} .innerZoomElementWrapper > div {
        border-width: 0 !important;
      }
    `,
    [selector, selectedPadding],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const selectorId =
      viewMode === 'docs' ? `addon-paddings-docs-${id}` : `addon-paddings`;

    setStyle(selectorId, paddingStyles);
  }, [id, viewMode, paddingStyles]);

  return getStory(context);
};

export default withPaddings;
