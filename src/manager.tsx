import { addons, types } from '@storybook/manager-api'
import React from 'react'

import { ADDON_ID, PARAM_KEY } from './constants'
import { Tool } from './Tool'

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Paddings',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <Tool />,
    paramKey: PARAM_KEY,
  })
})
