/* eslint-disable import/prefer-default-export */
import { logger } from '@storybook/client-logger';
import { WrapperSettings } from '@storybook/addons';
import { DEFAULT_PADDING } from './constants';

type Padding = { name: string; value: string };

export type PaddingsParameter = {
  default?: boolean;
  disable?: boolean;
  values: Padding[];
};

export type PaddingWithDefault = Padding & Pick<PaddingsParameter, 'default'>;

type Options = Padding[] | PaddingsParameter | WrapperSettings['parameters'];

export const isEnabled = (values: PaddingWithDefault[]): boolean =>
  values.length > 0;

export const normalizeValues = (options: Options): PaddingWithDefault[] => {
  if (Array.isArray(options)) {
    logger.warn(
      'Using array parameter with Paddings addon is deprecated, and support will be dropped in a future major version. Please refer to the release notes for migration: https://github.com/rbardini/storybook-addon-paddings/releases/tag/v2.1.0',
    );
    return options;
  }

  if (!options || options.disable || !options.values?.length) {
    return [];
  }

  return options.values.map((item: Padding) => {
    const { name, value } = item;
    const isDefault = options.default === name;

    return { name, value, default: isDefault };
  });
};

export const getSelectedPadding = (
  values: PaddingWithDefault[],
  currentValue: string,
): string => {
  if (currentValue === DEFAULT_PADDING) {
    return currentValue;
  }

  if (values.find(({ value }) => value === currentValue)) {
    return currentValue;
  }

  return values.find((option) => option.default)?.value ?? DEFAULT_PADDING;
};
