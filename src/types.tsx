import { ReactNode } from 'react';

export type Padding = { name: string; value: string };

export type PaddingsParameter = {
  default?: string;
  disable?: boolean;
  values: Padding[];
};

export type PaddingWithDefault = Padding & { default?: boolean };

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
