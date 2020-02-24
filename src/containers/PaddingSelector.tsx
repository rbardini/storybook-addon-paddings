import React, { FC, ReactNode } from 'react';
import memoize from 'memoizerific';
import { API, useParameter } from '@storybook/api';
import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';

import { PARAM_KEY, EVENTS } from '../constants';
import PaddingIcon from '../components/PaddingIcon';

type Item = {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  right?: ReactNode;
}

type Input = {
  name: string;
  value: string;
  default?: boolean;
}

type GlobalState = {
  name?: string;
  selected?: string;
}

const defaultPadding = '';

const createPaddingSelectorItem = memoize(1000)(
  (
    id: string,
    name: string,
    value: string,
    hasValue: boolean,
    change: (arg: { selected: string; name: string }) => void,
  ): Item => ({
    id: id || name,
    title: name,
    onClick: () => {
      change({ selected: value, name });
    },
    value,
    right: hasValue ? value : undefined,
  }),
);

const getSelectedPadding = (list: Input[], currentSelectedValue: string): string => {
  if (!list.length) {
    return defaultPadding;
  }

  if (currentSelectedValue === defaultPadding) {
    return currentSelectedValue;
  }

  if (list.find((i) => i.value === currentSelectedValue)) {
    return currentSelectedValue;
  }

  const defaultInput = list.find((i) => i.default);

  if (defaultInput) {
    return defaultInput.value;
  }

  return defaultPadding;
};

const getDisplayedItems = memoize(10)(
  (
    list: Input[],
    selected: string,
    change: (arg: GlobalState) => void,
  ) => {
    const availablePaddingSelectorItems: Item[] = [];

    if (selected !== defaultPadding) {
      availablePaddingSelectorItems.push(
        createPaddingSelectorItem('reset', 'Clear paddings', defaultPadding, null, change),
      );
    }

    if (list.length) {
      availablePaddingSelectorItems.push(
        ...list.map(({ name, value }) => (
          createPaddingSelectorItem(null, name, value, true, change)
        )),
      );
    }

    return availablePaddingSelectorItems;
  },
);

const PaddingSelector: FC<{ api: API }> = ({ api }) => {
  const items = useParameter(PARAM_KEY, []);
  const selectedPadding = getSelectedPadding(items, api.getAddonState(PARAM_KEY));

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
        active={selectedPadding !== defaultPadding}
        title="Change the paddings of the preview"
      >
        <PaddingIcon />
      </IconButton>
    </WithTooltip>
  ) : null;
};

export default PaddingSelector;
