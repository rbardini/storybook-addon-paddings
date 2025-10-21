import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from 'storybook/internal/types'
import { useEffect, useMemo } from 'storybook/preview-api'

import { DEFAULT_PADDING, PARAM_KEY } from './constants'
import {
  getSelectedPadding,
  isReducedMotionPreferred,
  normalizeValues,
} from './helpers'

const setStyle = (selector: string, css: string) => {
  const existingStyle = document.getElementById(selector)

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css
    }
  } else {
    const style = document.createElement('style')
    style.setAttribute('id', selector)
    style.innerHTML = css

    document.head.appendChild(style)
  }
}

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const { id, globals, parameters, viewMode } = context
  const globalsSelectedPadding = globals[PARAM_KEY]?.value
  const paddingsConfig = parameters[PARAM_KEY]
  const isInDocs = viewMode === 'docs'
  const selector = isInDocs
    ? `#anchor--${context.id} .sb-story`
    : '#storybook-root'

  const selectedPadding = useMemo(
    () =>
      getSelectedPadding(
        normalizeValues(paddingsConfig),
        globalsSelectedPadding,
      ) ?? DEFAULT_PADDING,
    [paddingsConfig, globalsSelectedPadding],
  )

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
  )

  useEffect(() => {
    const selectorId = isInDocs ? `addon-paddings-docs-${id}` : `addon-paddings`

    setStyle(selectorId, paddingStyles)
  }, [id, isInDocs, paddingStyles])

  return StoryFn()
}
