import React from 'react';
import { addons, types } from '@storybook/addons';

import { ADDON_ID } from './constants';
import PaddingSelector from './containers/PaddingSelector';

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: 'Paddings',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (
      <PaddingSelector api={api} />
    ),
  });
});
