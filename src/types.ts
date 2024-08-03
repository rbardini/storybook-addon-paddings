import { TooltipLinkList } from '@storybook/components'
import { ComponentProps } from 'react'

export type Padding = { name: string; value: string }

export type PaddingsParameter = {
  default?: string
  disable?: boolean
  values: Padding[]
}

export type PaddingWithDefault = Padding & { default?: boolean }

export type Item = ComponentProps<typeof TooltipLinkList>['links'][number]

export type GlobalState = {
  name?: string
  selected?: string
}
