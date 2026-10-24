import type { LucideProps } from '@lucide/svelte'
import type { Component } from 'svelte'

interface BooleanIcon {
  component: Component<LucideProps>
  color?: string
}

interface TableColumn<T extends object> {
  key: keyof T & string
  header: string
  align?: 'left' | 'center' | 'right'
  format?: (value: unknown, row: T) => string
  width?: string
  booleanIcons?: {
    true: BooleanIcon
    false: BooleanIcon
  }
}

export type { TableColumn }
