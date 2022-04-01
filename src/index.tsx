import { StoryWrapper, useEffect, useMemo } from '@storybook/addons';

import { DEFAULT_PADDING, PARAM_KEY } from './constants';
import {
  isReducedMotionPreferred,
  getSelectedPadding,
  normalizeValues,
} from './helpers';

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

const WithPaddings: StoryWrapper = (getStory, context) => {
  const { id, globals, parameters, viewMode } = context;
  const globalsSelectedPadding = globals[PARAM_KEY]?.value;
  const paddingsConfig = parameters[PARAM_KEY];
  const isInDocs = viewMode === 'docs';
  const selector = isInDocs
    ? `#anchor--${id} .docs-story > div:first-child`
    : '.sb-show-main';

  const selectedPadding = useMemo(
    () =>
      getSelectedPadding(
        normalizeValues(paddingsConfig),
        globalsSelectedPadding,
      ) ?? DEFAULT_PADDING,
    [paddingsConfig, globalsSelectedPadding],
  );

  const paddingStyles = useMemo(
    () => `
      ${selector} {
        margin: 0;
        padding: ${selectedPadding} !important;
        ${isReducedMotionPreferred() ? '' : 'transition: padding .3s;'}
      }

      ${selector} .innerZoomElementWrapper > div {
        border-width: 0 !important;
      }
    `,
    [selector, selectedPadding],
  );

  useEffect(() => {
    const selectorId = isInDocs
      ? `addon-paddings-docs-${id}`
      : `addon-paddings`;

    setStyle(selectorId, paddingStyles);
  }, [id, isInDocs, paddingStyles]);

  return getStory(context);
};

export default WithPaddings;
