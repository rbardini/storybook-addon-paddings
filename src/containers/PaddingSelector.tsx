import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import memoize from 'memoizerific';
import { useParameter, useGlobals } from '@storybook/api';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from '@storybook/components';

import { DEFAULT_PADDING, PARAM_KEY } from '../constants';
import {
  getSelectedPadding,
  normalizeValues,
  isEnabled,
  PaddingWithDefault,
} from '../helpers';
import PaddingIcon from '../components/PaddingIcon';

type Item = {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  right?: ReactNode;
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

const getDisplayedItems = memoize(10)(
  (
    list: PaddingWithDefault[],
    selected: string,
    change: (arg: GlobalState) => void,
  ) => {
    const availablePaddingSelectorItems: Item[] = [];

    if (selected !== DEFAULT_PADDING) {
      availablePaddingSelectorItems.push(
        createPaddingSelectorItem(
          'reset',
          'Clear paddings',
          DEFAULT_PADDING,
          null,
          change,
        ),
      );
    }

    availablePaddingSelectorItems.push(
      ...list.map(({ name, value }) =>
        createPaddingSelectorItem(null, name, value, true, change),
      ),
    );

    return availablePaddingSelectorItems;
  },
);

const PaddingSelector: FC = () => {
  const [globals, updateGlobals] = useGlobals();
  const options = useParameter(PARAM_KEY, null);
  const values = normalizeValues(options);

  const selectedPadding = useMemo(
    () => getSelectedPadding(values, globals[PARAM_KEY]?.value),
    [globals, values],
  );

  const onPaddingChange = useCallback(
    (value: string) => {
      updateGlobals({ [PARAM_KEY]: { ...globals[PARAM_KEY], value } });
    },
    [globals, updateGlobals],
  );

  return isEnabled(values) ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={getDisplayedItems(values, selectedPadding, ({ selected }) => {
            onPaddingChange(selected);
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
