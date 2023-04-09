import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components'
import { useParameter, useGlobals } from '@storybook/manager-api'
import React, {
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'
import memoize from 'memoizerific'

import { PaddingIcon } from './components/PaddingIcon'
import { DEFAULT_PADDING, PARAM_KEY } from './constants'
import { getSelectedPadding, normalizeValues, isEnabled } from './helpers'
import { PaddingWithDefault, Item, GlobalState } from './types'

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
)

const getDisplayedItems = memoize(10)(
  (
    list: PaddingWithDefault[],
    selected: string,
    change: (arg: GlobalState) => void,
  ) => {
    const availablePaddingSelectorItems: Item[] = []

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
      )
    }

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
    )

    return availablePaddingSelectorItems
  },
)

export const Tool: FC = () => {
  const [globals, updateGlobals] = useGlobals()
  const options = useParameter(PARAM_KEY, null)
  const values = normalizeValues(options)

  const selectedPadding = useMemo(
    () => getSelectedPadding(values, globals[PARAM_KEY]?.value),
    [globals, values],
  )

  const onPaddingChange = useCallback(
    (value: string) => {
      updateGlobals({ [PARAM_KEY]: { ...globals[PARAM_KEY], value } })
    },
    [globals, updateGlobals],
  )

  const renderTooltip = useCallback<
    Extract<
      ComponentProps<typeof WithTooltip>['tooltip'],
      (p: unknown) => ReactNode
    >
  >(
    ({ onHide }) => (
      <TooltipLinkList
        links={getDisplayedItems(values, selectedPadding, ({ selected }) => {
          onPaddingChange(selected)
          onHide()
        })}
      />
    ),
    [onPaddingChange, selectedPadding, values],
  )

  return isEnabled(values) ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={renderTooltip}
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
  ) : null
}
