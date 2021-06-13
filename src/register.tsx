import React from 'react';
import { addons, types } from '@storybook/addons';

import { ADDON_ID, PARAM_KEY } from './constants';
import PaddingSelector from './containers/PaddingSelector';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Paddings',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <PaddingSelector />,
    paramKey: PARAM_KEY,
  });
});
