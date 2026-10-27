<script lang="ts">
  interface Props {
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    loading?: boolean
    onConfirm: () => void | Promise<void>
    onCancel: () => void
  }

  let {
    open,
    title,
    description,
    confirmLabel = 'Excluir',
    cancelLabel = 'Cancelar',
    loading = false,
    onConfirm,
    onCancel,
  }: Props = $props()
</script>

{#if open}
  <div class="dialog-backdrop">
    <button
      type="button"
      class="backdrop-button"
      aria-label="Cancelar operação"
      disabled={loading}
      onclick={onCancel}
      tabindex="-1"
    ></button>

    <div
      class="dialog"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <h2 id="dialog-title">{title}</h2>

      <p id="dialog-description">{description}</p>

      <div class="dialog-actions">
        <button type="button" class="cancel-button" disabled={loading} onclick={onCancel}>
          {cancelLabel}
        </button>

        <button type="button" class="confirm-button" disabled={loading} onclick={onConfirm}>
          {loading ? 'Processando...' : confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 16px;
    background: rgb(0 0 0 / 55%);
  }

  .backdrop-button {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: default;
  }

  .dialog {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    max-width: 420px;
    padding: 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: 0 8px 32px rgb(0 0 0 / 20%);
  }

  .dialog h2 {
    margin: 0 0 12px;
    font-size: 1.125rem;
  }

  .dialog p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  .dialog-actions button {
    padding: 8px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    cursor: pointer;
  }

  .dialog-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .cancel-button {
    background: var(--color-surface);
    color: var(--color-text);
  }

  .confirm-button {
    border-color: var(--color-danger, #dc2626);
    background: var(--color-danger, #dc2626);
    color: white;
  }

  .dialog-actions button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
</style>
