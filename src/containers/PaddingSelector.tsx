import React, { ComponentProps, FC } from 'react';
import memoize from 'memoizerific';
import { API, useParameter } from '@storybook/api';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from '@storybook/components';

import { DEFAULT_PADDING, PARAM_KEY, EVENTS } from '../constants';
import { getSelectedPadding } from '../helpers';
import PaddingIcon from '../components/PaddingIcon';

type Item = ComponentProps<typeof TooltipLinkList>['links'][0];

type Input = {
  name: string;
  value: string;
  default?: boolean;
};

type GlobalState = {
  name?: string;
  selected?: string;
};

const createPaddingSelectorItem = memoize(1000)(
  (
    id: string,
    name: string,
    value: string,
    hasValue: boolean,
    active: boolean,
    change: (arg: { selected: string; name: string }) => void,
  ): Item => ({
    id: id || name,
    title: name,
    onClick: () => change({ selected: value, name }),
    active,
    right: hasValue ? value : undefined,
  }),
);

const getDisplayedItems = memoize(10)(
  (list: Input[], selected: string, change: (arg: GlobalState) => void) => {
    const availablePaddingSelectorItems: Item[] = [];

    if (selected !== DEFAULT_PADDING) {
      availablePaddingSelectorItems.push(
        createPaddingSelectorItem(
          'reset',
          'Clear paddings',
          DEFAULT_PADDING,
          false,
          false,
          change,
        ),
      );
    }

    if (list.length) {
      availablePaddingSelectorItems.push(
        ...list.map(({ name, value }) =>
          createPaddingSelectorItem(
            null,
            name,
            value,
            true,
            value === selected,
            change,
          ),
        ),
      );
    }

    return availablePaddingSelectorItems;
  },
);

const PaddingSelector: FC<{ api: API }> = ({ api }) => {
  const items = useParameter(PARAM_KEY, []);
  const selectedPadding = getSelectedPadding(
    items,
    api.getAddonState(PARAM_KEY),
  );

  return items.length ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={getDisplayedItems(items, selectedPadding, ({ selected }) => {
            api.setAddonState(PARAM_KEY, selected);
            api.emit(EVENTS.UPDATE, selected);
            onHide();
          })}
        />
      )}
      closeOnClick
    >
      <IconButton
        key="padding"
        active={selectedPadding !== DEFAULT_PADDING}
        title="Change the paddings of the preview"
      >
        <PaddingIcon />
      </IconButton>
    </WithTooltip>
  ) : null;
};

export default PaddingSelector;
