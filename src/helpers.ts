import { DEFAULT_PADDING } from './constants'
import { PaddingWithDefault, PaddingsParameter, Padding } from './types'

export const isEnabled = (values: PaddingWithDefault[]): boolean =>
  values.length > 0

export const isReducedMotionPreferred = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const normalizeValues = (
  parameters: PaddingsParameter,
): PaddingWithDefault[] => {
  if (!parameters || parameters.disable || !parameters.values?.length) {
    return []
  }

  return parameters.values.map((item: Padding) => {
    const { name, value } = item
    const isDefault = parameters.default === name

    return { name, value, default: isDefault }
  })
}

export const getSelectedPadding = (
  values: PaddingWithDefault[],
  currentValue: string,
): string => {
  if (currentValue === DEFAULT_PADDING) {
    return currentValue
  }

  if (values.find(({ value }) => value === currentValue)) {
    return currentValue
  }

  return values.find(option => option.default)?.value ?? DEFAULT_PADDING
}
