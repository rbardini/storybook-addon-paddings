export type Padding = { name: string; value: string }

export type PaddingsParameter = {
  default?: string
  disable?: boolean
  values: Padding[]
}

export type PaddingWithDefault = Padding & { default?: boolean }
