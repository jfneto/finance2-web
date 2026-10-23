<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
    loading?: boolean
    disabled?: boolean
    class?: string
    onclick?: (event: MouseEvent) => void
  }

  let {
    children,
    variant = 'primary',
    size = 'md',
    type = 'button',
    fullWidth = false,
    loading = false,
    disabled = false,
    class: className = '',
    onclick,
  }: Props = $props()
</script>

<button
  {type}
  class="button {variant} {size} {className}"
  class:full-width={fullWidth}
  {disabled}
  aria-busy={loading}
  {onclick}
>
  {#if loading}
    <span class="spinner" aria-hidden="true"></span>
  {/if}

  <span class:loading-content={loading}> {@render children()} </span>
</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm, 4px);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color 150ms ease,
      border-color 150ms ease,
      color 150ms ease,
      box-shadow 150ms ease;
  }

  .button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .sm {
    min-height: 32px;
    padding: 6px 12px;
    font-size: 0.875rem;
  }

  .md {
    min-height: 40px;
    padding: 8px 16px;
    font-size: 0.9375rem;
  }

  .lg {
    min-height: 48px;
    padding: 12px 20px;
    font-size: 1rem;
  }

  .full-width {
    width: 100%;
  }

  .primary {
    background: var(--color-primary);
    color: white;
  }

  .primary:not(:disabled):hover {
    background: var(--color-primary-hover);
  }

  .secondary {
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .secondary:not(:disabled):hover {
    background: var(--color-input);
  }

  .outline {
    background: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  .outline:not(:disabled):hover {
    background: var(--color-input);
  }

  .ghost {
    background: transparent;
    color: var(--color-text);
  }

  .ghost:not(:disabled):hover {
    background: var(--color-input);
  }

  .danger {
    background: var(--color-danger);
    color: white;
  }

  .danger:not(:disabled):hover {
    filter: brightness(0.9);
  }

  .spinner {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 700ms linear infinite;
  }

  .loading-content {
    opacity: 0.8;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .button {
      transition: none;
    }

    .spinner {
      animation-duration: 1500ms;
    }
  }
</style>
