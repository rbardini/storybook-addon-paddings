import React, { Component, ReactNode } from 'react';
import memoize from 'memoizerific';

import { Combo, Consumer, API } from '@storybook/api';
import { Global } from '@storybook/theming';

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

const iframeId = 'storybook-preview-iframe';
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

  if (list.find((i) => i.default)) {
    return list.find((i) => i.default).value;
  }

  return defaultPadding;
};

const mapper = ({ api, state }: Combo): { items: Input[]; selected: string | null } => {
  const story = state.storiesHash[state.storyId];
  const list = story ? api.getParameters(story.id, PARAM_KEY) : [];
  const selected = state.addons[PARAM_KEY] || null;

  return { items: list || [], selected };
};

const getDisplayedItems = memoize(10)(
  (
    list: Input[],
    selected: string | null,
    change: (arg: { selected: string; name: string }) => void,
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

interface GlobalState {
  name: string | undefined;
  selected: string | undefined;
}

interface Props {
  api: API;
}

export default class PaddingSelector extends Component<Props> {
  change = ({ selected, name }: GlobalState) => {
    const { api } = this.props;
    if (typeof selected === 'string') {
      api.setAddonState<string>(PARAM_KEY, selected);
    }
    api.emit(EVENTS.UPDATE, { selected, name });
  };

  render() {
    return (
      <Consumer filter={mapper}>
        {({ items, selected }: ReturnType<typeof mapper>) => {
          const selectedPadding = getSelectedPadding(items, selected);

          return items.length ? (
            <>
              {selectedPadding ? (
                <Global
                  styles={{
                    [`#${iframeId}`]: {
                      boxSizing: 'border-box',
                      padding: selectedPadding,
                    },
                  }}
                />
              ) : null}
              <WithTooltip
                placement="top"
                trigger="click"
                tooltip={({ onHide }) => (
                  <TooltipLinkList
                    links={getDisplayedItems(items, selectedPadding, (i) => {
                      this.change(i);
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
            </>
          ) : null;
        }}
      </Consumer>
    );
  }
}
