<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    id: string
    label: string
    checked?: boolean
    description?: string
    error?: string
    disabled?: boolean
    required?: boolean
    children?: Snippet
    onchange?: (checked: boolean) => void
  }

  let {
    id,
    label,
    checked = $bindable(false),
    description,
    error,
    disabled = false,
    required = false,
    children,
    onchange,
  }: Props = $props()
</script>

<div class="field" class:has-error={!!error}>
  <label class="control" for={id}>
    <input
      {id}
      type="checkbox"
      bind:checked
      {disabled}
      {required}
      aria-invalid={!!error}
      aria-describedby={[description ? `${id}-description` : undefined, error ? `${id}-error` : undefined]
        .filter(Boolean)
        .join(' ') || undefined}
      onchange={(event) => onchange?.(event.currentTarget.checked)}
    >

    <span class="indicator" aria-hidden="true">
      {#if checked}
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <path
            d="m3.5 8 3 3 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      {/if}
    </span>

    <span class="label-content">
      <span class="label-text">
        {label}
        {#if required}
          <span class="required" aria-hidden="true"> *</span>
        {/if}
      </span>

      {#if children}
        <span class="description"> {@render children()} </span>
      {:else if description}
        <span class="description" id={`${id}-description`}>
          {description}
        </span>
      {/if}
    </span>
  </label>

  {#if error}
    <small class="error" id={`${id}-error`} role="alert">{error}</small>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .control {
    display: inline-flex;
    align-items: flex-start;
    gap: 10px;
    width: fit-content;
    cursor: pointer;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .indicator {
    display: inline-flex;
    flex: 0 0 16px;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    background: var(--color-input);
    color: white;
    transition:
      background-color 150ms ease,
      border-color 150ms ease,
      box-shadow 150ms ease;
  }

  .indicator svg {
    width: 14px;
    height: 14px;
  }

  input:where(:checked) + .indicator {
    border-color: var(--color-primary);
    background: var(--color-primary);
  }

  input:where(:focus-visible) + .indicator {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  input:where(:disabled) + .indicator {
    opacity: 0.55;
  }

  .control:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .label-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .label-text {
    color: var(--color-text);
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .required,
  .error {
    color: var(--color-danger, #f87171);
  }

  .description {
    color: var(--color-text-muted);
    font-size: 0.8125rem;
    line-height: 1.4;
  }

  .has-error .indicator {
    border-color: var(--color-danger, #f87171);
  }

  .error {
    padding-left: 26px;
    font-size: 0.75rem;
    line-height: 1.4;
  }

  @media (prefers-reduced-motion: reduce) {
    .indicator {
      transition: none;
    }
  }
</style>
