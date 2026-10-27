<script lang="ts">
  import { confirmState, resolveConfirm } from './confirm.svelte'
</script>

{#if confirmState.open}
  <div class="dialog-backdrop">
    <div class="dialog" role="alertdialog" aria-modal="true">
      <h2>{confirmState.title}</h2>
      <p>{confirmState.description}</p>

      <div class="dialog-actions">
        <button type="button" onclick={() => resolveConfirm(false)}>
          {confirmState.cancelLabel}
        </button>

        <button type="button" class:destructive={confirmState.destructive} onclick={() => resolveConfirm(true)}>
          {confirmState.confirmLabel}
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

  .dialog {
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
    gap: 12px;
    margin-top: 24px;
  }

  .dialog-actions button {
    padding: 8px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
  }

  .dialog-actions .destructive {
    border-color: var(--color-danger, #dc2626);
    background: var(--color-danger, #dc2626);
    color: white;
  }
</style>
