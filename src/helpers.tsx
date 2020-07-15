/* eslint-disable import/prefer-default-export */
import { WrapperSettings } from '@storybook/addons';
import { DEFAULT_PADDING } from './constants';

type Value = { name: string; value: string };

type Values = { [key: string]: Value };

type PaddingConfig = {
  default: string;
  disable?: boolean;
  values: Values;
}

type Option = Value & {default?: boolean}

type Options = Option[] | PaddingConfig | WrapperSettings['parameters'];

export const normalizeEntries = (options: Options) => (Array.isArray(options)
  ? options
  : Object.entries<Value>(options.values).map(([key, { name, value }]) => {
    const isDefault = options.default === key;

    return { name, value, default: isDefault };
  }));

export const isEnabled = (options: Options) => {
  const items = Array.isArray(options) ? options : Object.entries(options.values);

  return items.length > 0;
};

export const getSelectedPadding = (options: Options, currentValue: string): string => {
  const entries = normalizeEntries(options);

  if (!isEnabled(entries)) {
    return DEFAULT_PADDING;
  }

  if (currentValue === DEFAULT_PADDING) {
    return currentValue;
  }

  if (entries.find(({ value }) => value === currentValue)) {
    return currentValue;
  }

  return entries.find((option) => option.default)?.value ?? DEFAULT_PADDING;
};
