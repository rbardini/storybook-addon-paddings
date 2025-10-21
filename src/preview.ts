import type { Renderer, ProjectAnnotations } from 'storybook/internal/types'

import { PARAM_KEY } from './constants'
import { withGlobals } from './withGlobals'

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGlobals],
  initialGlobals: {
    [PARAM_KEY]: false,
  },
  parameters: {
    [PARAM_KEY]: {
      values: [
        { name: 'Small', value: '16px' },
        { name: 'Medium', value: '32px' },
        { name: 'Large', value: '64px' },
      ],
    },
  },
}

export default preview
