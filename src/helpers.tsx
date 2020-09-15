/* eslint-disable import/prefer-default-export */
import { WrapperSettings } from '@storybook/addons';
import { DEFAULT_PADDING } from './constants';

type Option = {
  name: string;
  value: string;
  default?: boolean;
};

type Options = Option[] | WrapperSettings['parameters'];

export const isEnabled = (options: Options): options is Option[] =>
  options.length > 0;

export const getSelectedPadding = (
  options: Options,
  currentValue: string,
): string => {
  if (!isEnabled(options)) {
    return DEFAULT_PADDING;
  }

  if (currentValue === DEFAULT_PADDING) {
    return currentValue;
  }

  if (options.find(({ value }) => value === currentValue)) {
    return currentValue;
  }

  return options.find((option) => option.default)?.value ?? DEFAULT_PADDING;
};
