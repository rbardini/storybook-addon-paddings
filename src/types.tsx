import { ReactNode } from 'react';
import { WrapperSettings } from '@storybook/addons';

export type Padding = { name: string; value: string };

export type PaddingsParameter = {
  default?: boolean;
  disable?: boolean;
  values: Padding[];
};

export type PaddingWithDefault = Padding & Pick<PaddingsParameter, 'default'>;

export type Options =
  | Padding[]
  | PaddingsParameter
  | WrapperSettings['parameters'];

export type Item = {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  right?: ReactNode;
};

export type GlobalState = {
  name?: string;
  selected?: string;
};

export type PaddingsOptions = {
  addDecorator?: boolean;
};
