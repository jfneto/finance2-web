<script lang="ts">
  import type { LucideProps } from '@lucide/svelte'
  import type { Component } from 'svelte'

  interface Props {
    icon: Component<LucideProps>
    label?: string
    onclick: () => void
    color?: string
    size?: number
    buttonSize?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }

  let {
    icon: Icon,
    label,
    onclick,
    color = 'inherit',
    size = 18,
    buttonSize = '36px',
    disabled = false,
    type = 'button',
  }: Props = $props()
</script>

<button
  {type}
  {disabled}
  {onclick}
  aria-label={label}
  title={label}
  class="icon-button"
  style:--icon-button-size={buttonSize}
  style:--icon-button-color={color}
>
  <Icon {size} />
</button>

<style>
  .icon-button {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--icon-button-size);
    height: var(--icon-button-size);
    padding: 0;
    color: var(--icon-button-color);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--radius-sm, 4px);
    cursor: pointer;
    transition:
      background-color 150ms ease,
      border-color 150ms ease;
  }

  .icon-button:hover:not(:disabled) {
    background: var(--color-hover, rgb(127 127 127 / 12%));
  }

  .icon-button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .icon-button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
</style>
