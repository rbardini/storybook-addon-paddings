import { addons, types } from 'storybook/manager-api'

import { ADDON_ID } from './constants'
import { Tool } from './Tool'

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Paddings',
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: Tool,
  })
})
