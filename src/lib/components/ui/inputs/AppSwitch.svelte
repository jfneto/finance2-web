<script lang="ts">
  interface Props {
    checked?: boolean
    label?: string
    disabled?: boolean
    name?: string
  }

  let { checked = $bindable(false), label, disabled = false, name }: Props = $props()

  const id = $props.id()
</script>

<label class="switch-wrapper" for={id} aria-labelledby={id}>
  <input {id} type="checkbox" role="switch" aria-checked={checked} {name} {disabled} bind:checked>

  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>

  {#if label}
    <span class="switch-label">{label}</span>
  {/if}
</label>

<style>
  .switch-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    appearance: none;
    opacity: 0;
  }

  .switch-track {
    display: inline-flex;
    flex: 0 0 36px;
    align-items: center;
    width: 36px;
    height: 20px;
    padding: 2px;
    border-radius: 999px;
    background: var(--color-border, #9ca3af);
    transition: background-color 150ms ease;
  }

  .switch-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: transform 150ms ease;
  }

  .switch-label {
    font-size: 14px;
  }

  input:checked + .switch-track {
    background: var(--color-primary, #2563eb);
  }

  input:checked + .switch-track .switch-thumb {
    transform: translateX(16px);
  }

  input:focus-visible + .switch-track {
    outline: 2px solid var(--color-primary, #2563eb);
    outline-offset: 2px;
  }

  input:disabled + .switch-track,
  input:disabled ~ .switch-label {
    opacity: 0.5;
  }

  input:disabled ~ .switch-label {
    cursor: not-allowed;
  }
</style>
