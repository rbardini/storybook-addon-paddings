import { type ComponentProps } from 'react'
import { TooltipLinkList } from 'storybook/internal/components'

export type Padding = { name: string; value: string }

export type PaddingsParameter = {
  default?: string
  disable?: boolean
  values: Padding[]
}

export type PaddingWithDefault = Padding & { default?: boolean }

export type Item = Extract<
  ComponentProps<typeof TooltipLinkList>['links'][number],
  Array<any>
>[number]

export type GlobalState = {
  name?: string
  selected?: string
}
