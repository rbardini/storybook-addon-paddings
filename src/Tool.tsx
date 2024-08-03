import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components'
import { useParameter, useGlobals } from '@storybook/manager-api'
import React, { memo, useCallback, useMemo } from 'react'

import { PaddingIcon } from './components/PaddingIcon'
import { DEFAULT_PADDING, PARAM_KEY } from './constants'
import { getSelectedPadding, normalizeValues, isEnabled } from './helpers'
import { PaddingWithDefault, Item, GlobalState } from './types'

const createItem = (
  id: string | undefined,
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
})

const getDisplayedItems = (
  list: PaddingWithDefault[],
  selected: string,
  change: (arg: GlobalState) => void,
) =>
  list.reduce<Item[]>(
    (acc, { name, value }) => (
      acc.push(
        createItem(undefined, name, value, true, value === selected, change),
      ),
      acc
    ),
    selected === DEFAULT_PADDING
      ? []
      : [
          createItem(
            'reset',
            'Clear paddings',
            DEFAULT_PADDING,
            false,
            false,
            change,
          ),
        ],
  )

export const Tool = memo(() => {
  const [globals, updateGlobals] = useGlobals()
  const options = useParameter(PARAM_KEY, null)
  const values = normalizeValues(options)

  const selectedPadding = useMemo(
    () => getSelectedPadding(values, globals[PARAM_KEY]?.value),
    [globals, values],
  )

  const onPaddingChange = useCallback(
    (value: string) =>
      updateGlobals({ [PARAM_KEY]: { ...globals[PARAM_KEY], value } }),
    [globals, updateGlobals],
  )

  return isEnabled(values) ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={getDisplayedItems(values, selectedPadding, ({ selected }) => {
            onPaddingChange(selected)
            onHide()
          })}
        />
      )}
      closeOnOutsideClick
    >
      <IconButton
        key="paddings"
        active={selectedPadding !== DEFAULT_PADDING}
        title="Change the paddings of the preview"
      >
        <PaddingIcon />
      </IconButton>
    </WithTooltip>
  ) : null
})
