import type { Component } from 'svelte'

interface MenuItem {
  label: string
  href: string
  icon: Component
  group?: string
}

export type { MenuItem }
