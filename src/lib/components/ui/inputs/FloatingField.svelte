<script lang="ts">
  interface Props {
    id: string
    label: string
    value?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    name?: string
    placeholder?: string
    autocomplete?: HTMLInputElement['autocomplete']
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
    error?: string
    hint?: string
    minlength?: number
    maxlength?: number
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void
    onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void
  }

  let {
    id,
    label,
    value = $bindable(''),
    type = 'text',
    name,
    placeholder = ' ',
    autocomplete,
    required = false,
    disabled = false,
    readonly = false,
    invalid = false,
    error,
    hint,
    minlength,
    maxlength,
    inputmode,
    oninput,
    onblur,
  }: Props = $props()

  let hasError = $derived(invalid || !!error)
  let describedBy = $derived(
    [hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined].filter(Boolean).join(' ') || undefined,
  )
</script>

<div class="field" class:has-error={hasError} class:has-value={!!value}>
  <div class="field-control">
    <input
      {id}
      {name}
      {type}
      {placeholder}
      {autocomplete}
      {required}
      {disabled}
      {readonly}
      {minlength}
      {maxlength}
      {inputmode}
      bind:value
      aria-invalid={hasError}
      aria-describedby={describedBy}
      {oninput}
      {onblur}
    >

    <label for={id}>
      {label}
      {#if required}
        <span class="required" aria-hidden="true"> *</span>
      {/if}
    </label>
  </div>

  {#if hint && !error}
    <small class="hint" id={`${id}-hint`}>{hint}</small>
  {/if}

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

  .field-control {
    position: relative;
  }

  input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 56px;
    padding: 16px 14px 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    outline: none;
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease;
  }

  input::placeholder {
    color: transparent;
  }

  label {
    position: absolute;
    top: 50%;
    left: 11px;
    max-width: calc(100% - 28px);
    padding: 0 4px;
    overflow: hidden;
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-size: 1rem;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    transform: translateY(-50%);
    transform-origin: left center;
    transition:
      top 150ms ease,
      transform 150ms ease,
      color 150ms ease;
  }

  input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }

  input:where(:focus) + label {
    top: 0;
    transform: translateY(-50%) scale(0.85);
  }

  input:where(:not(:placeholder-shown)) + label {
    top: 0;
    transform: translateY(-50%) scale(0.85);
  }

  input:where(:focus) + label {
    color: var(--color-primary);
  }

  .required {
    color: var(--color-danger, #f87171);
  }

  .hint,
  .error {
    padding-inline: 14px;
    font-size: 12px;
    line-height: 1.4;
  }

  .hint {
    color: var(--color-text-muted);
  }

  .error {
    color: var(--color-danger, #f87171);
  }

  .has-error input {
    border-color: var(--color-danger, #f87171);
  }

  .has-error input:focus {
    border-color: var(--color-danger, #f87171);
    box-shadow: 0 0 0 1px var(--color-danger, #f87171);
  }

  .has-error label {
    color: var(--color-danger, #f87171);
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  input:disabled + label {
    cursor: not-allowed;
    opacity: 0.65;
  }

  input:read-only {
    cursor: default;
  }

  input:where(:-webkit-autofill),
  input:where(:-webkit-autofill:hover),
  input:where(:-webkit-autofill:focus),
  input:where(:-webkit-autofill:active) {
    -webkit-text-fill-color: var(--color-text);
    caret-color: var(--color-text);
    -webkit-box-shadow: 0 0 0 1000px var(--color-surface) inset;
    box-shadow: 0 0 0 1000px var(--color-surface) inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  @media (prefers-reduced-motion: reduce) {
    label,
    input {
      transition: none;
    }
  }
</style>
