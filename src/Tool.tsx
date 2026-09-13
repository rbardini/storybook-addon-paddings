import React, { memo, useCallback, useMemo } from 'react'
import { Select } from 'storybook/internal/components'
import { useGlobals, useParameter } from 'storybook/manager-api'

import { PaddingIcon } from './components/PaddingIcon'
import { DEFAULT_PADDING, PARAM_KEY } from './constants'
import { getSelectedPadding, isEnabled, normalizeValues } from './helpers'

export const Tool = memo(() => {
  const [globals, updateGlobals] = useGlobals()
  const options = useParameter(PARAM_KEY, null)
  const values = normalizeValues(options)

  const selectedPadding = useMemo(
    () => getSelectedPadding(values, globals[PARAM_KEY]?.value),
    [globals, values],
  )

  const onPaddingChange = useCallback(
    (value?: string) =>
      updateGlobals({ [PARAM_KEY]: { ...globals[PARAM_KEY], value } }),
    [globals, updateGlobals],
  )

  const selectOptions = useMemo(
    () => values.map(({ name, value }) => ({ title: name, value })),
    [values],
  )

  return isEnabled(values) ? (
    <Select
      key="paddings"
      ariaLabel="Change the paddings of the preview"
      tooltip="Change the paddings of the preview"
      icon={<PaddingIcon />}
      options={selectOptions}
      defaultOptions={selectedPadding}
      onSelect={selected => onPaddingChange(selected as string)}
      onReset={() => onPaddingChange(DEFAULT_PADDING)}
      resetLabel="Clear paddings"
    />
  ) : null
})
