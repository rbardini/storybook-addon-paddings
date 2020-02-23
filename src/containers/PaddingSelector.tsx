import React, { FC, ReactNode } from 'react';
import memoize from 'memoizerific';

import { Combo, Consumer, API } from '@storybook/api';

import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';

import { PARAM_KEY, EVENTS } from '../constants';
import PaddingIcon from '../components/PaddingIcon';

interface Item {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  right?: ReactNode;
}

interface Input {
  name: string;
  value: string;
  default?: boolean;
}

const defaultPadding = 'unset';

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

const mapper = ({ api, state }: Combo): { items: Input[]; selected: string | null } => {
  const story = state.storiesHash[state.storyId];
  const list = story ? api.getParameters(story.id, PARAM_KEY) : [];
  const selected = state.addons[PARAM_KEY] || defaultPadding;

  return { items: list || [], selected };
};

const getDisplayedItems = memoize(10)(
  (
    list: Input[],
    selected: string,
    change: (arg: GlobalState) => void,
  ) => {
    let availablePaddingSelectorItems: Item[] = [];

    if (selected !== defaultPadding) {
      availablePaddingSelectorItems.push(
        createPaddingSelectorItem('reset', 'Clear paddings', defaultPadding, null, change),
      );
    }

    if (list.length) {
      availablePaddingSelectorItems = [
        ...availablePaddingSelectorItems,
        ...list.map(({ name, value }) => (
          createPaddingSelectorItem(null, name, value, true, change)
        )),
      ];
    }

    return availablePaddingSelectorItems;
  },
);

export interface GlobalState {
  name?: string;
  selected?: string;
}

interface Props {
  api: API;
}

const update = (state: GlobalState, api: API) => {
  const { selected } = state;

  if (typeof selected === 'string') {
    api.setAddonState<string>(PARAM_KEY, selected);
  }

  api.emit(EVENTS.UPDATE, state);
};

const PaddingSelector: FC<Props> = ({ api }) => (
  <Consumer filter={mapper}>
    {({ items, selected }: ReturnType<typeof mapper>) => {
      const selectedPadding = getSelectedPadding(items, selected);

      return items.length ? (
        <WithTooltip
          placement="top"
          trigger="click"
          tooltip={({ onHide }) => (
            <TooltipLinkList
              links={getDisplayedItems(items, selectedPadding, (state) => {
                update(state, api);
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
    }}
  </Consumer>
);

export default PaddingSelector;
