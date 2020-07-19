/* eslint-disable import/prefer-default-export */
import { logger } from '@storybook/client-logger';
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

export const normalizeValues = (options: Options): Option[] => (Array.isArray(options)
  ? options
  : Object.entries<Value>(options.values).map(([key, { name, value }]) => {
    const isDefault = options.default === key;

    return { name, value, default: isDefault };
  }));

export const isEnabled = (options: Options): boolean => {
  if (Array.isArray(options)) {
    logger.warn(
      'Using array parameter with Paddings addon is deprecated, and support will be dropped in a future major version. Please refer to the release notes for migration: https://github.com/rbardini/storybook-addon-paddings/releases/tag/v2.1.0',
    );

    return options.length > 0;
  }

  return options && !options?.disable && Object.entries(options.values).length > 0;
};

export const getSelectedPadding = (values: Option[], currentValue: string): string => {
  if (currentValue === DEFAULT_PADDING) {
    return currentValue;
  }

  if (values.find(({ value }) => value === currentValue)) {
    return currentValue;
  }

  return values.find((option) => option.default)?.value ?? DEFAULT_PADDING;
};
