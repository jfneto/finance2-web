import type { LucideProps } from '@lucide/svelte'
import type { Component } from 'svelte'

type Primitive = string | number | boolean | bigint | symbol | null | undefined

type IsAtomic<T> = T extends Primitive | Date | RegExp | Function ? true : false

type NestedKeyOf<T, Depth extends number[] = []> = Depth['length'] extends 3
  ? never
  : {
      [K in keyof T & string]: NonNullable<T[K]> extends object
        ? NonNullable<T[K]> extends readonly unknown[] | Date | Function
          ? K
          : K | `${K}.${NestedKeyOf<NonNullable<T[K]>, [...Depth, 0]> & string}`
        : K
    }[keyof T & string]

interface BooleanIcon {
  component: Component<LucideProps>
  color?: string
}

interface BooleanIcons {
  true: BooleanIcon
  false: BooleanIcon
  when?: (value: unknown) => boolean
}

interface TableAction<T extends object> {
  label: string
  icon: Component<LucideProps>
  color?: string
  onClick: (row: T) => void
}

interface DataColumn<T extends object> {
  type?: 'accessor'
  key: NestedKeyOf<T> & string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  format?: (value: unknown, row: T) => string
  booleanIcons?: BooleanIcons
}

interface ActionsColumn<T extends object> {
  type: 'actions'
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  actions: (row: T) => TableAction<T>[]
}

type TableColumn<T extends object> = DataColumn<T> | ActionsColumn<T>

export type { BooleanIcon, BooleanIcons, TableAction, TableColumn }
