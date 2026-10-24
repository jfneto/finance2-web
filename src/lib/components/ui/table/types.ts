import type { LucideProps } from '@lucide/svelte'
import type { Component } from 'svelte'

interface BooleanIcon {
  component: Component<LucideProps>
  color?: string
}

interface TableAction<T extends object> {
  label: string
  icon: Component<LucideProps>
  color?: string
  onClick: (row: T) => void
}

interface DataColumn<T extends object> {
  type?: 'accessor'
  key: keyof T & string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  format?: (value: unknown, row: T) => string
  booleanIcons?: { true: BooleanIcon; false: BooleanIcon }
}

interface ActionsColumn<T extends object> {
  type: 'actions'
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  actions: (row: T) => TableAction<T>[]
}

type TableColumn<T extends object> = DataColumn<T> | ActionsColumn<T>

export type { TableAction, TableColumn }
