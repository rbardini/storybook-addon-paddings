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

const WithPaddings: StoryWrapper = (getStory, context) => {
  const { id, globals, parameters, viewMode } = context;
  const globalsSelectedPadding = globals[PARAM_KEY]?.value;
  const paddingsConfig = parameters[PARAM_KEY];
  const isInDocs = viewMode === 'docs';
  const selector = isInDocs
    ? [
        `#anchor--${id} .docs-story > div:first-child`,
        // Workaround for MDX stories in docs view mode
        // https://github.com/storybookjs/storybook/issues/14322
        `#anchor--${id} ~ .sbdocs-preview .docs-story > div:first-child`,
      ].join()
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
    // Undo default `padded` layout styles
    // https://github.com/storybookjs/storybook/issues/12135
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

  useEffect(() => {
    const selectorId = isInDocs
      ? `addon-paddings-docs-${id}`
      : `addon-paddings`;

    setStyle(selectorId, paddingStyles);
  }, [id, isInDocs, paddingStyles]);

  return getStory(context);
};

export default WithPaddings;
