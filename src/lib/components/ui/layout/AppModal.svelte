<script lang="ts">
  import { X } from '@lucide/svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    open: boolean
    title: string
    children: Snippet
    footer?: Snippet
    width?: string
    onClose: () => void
  }

  let { open = $bindable(false), title, children, footer, width = '480px', onClose }: Props = $props()

  let dialogElement: HTMLDialogElement

  $effect(() => {
    if (open && !dialogElement.open) {
      dialogElement.showModal()
    } else if (!open && dialogElement.open) {
      dialogElement.close()
    }
  })

  const handleClose = () => {
    open = false
    onClose()
  }

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogElement) {
      handleClose()
    }
  }
</script>

<dialog
  bind:this={dialogElement}
  class="modal"
  style:--modal-width={width}
  onclick={handleBackdropClick}
  onkeyup={() => {}}
  onclose={() => {
    if (open) {
      handleClose()
    }
  }}
>
  <div class="modal-content">
    <header class="modal-header">
      <h2>{title}</h2>

      <button type="button" class="close-button" aria-label="Fechar modal" onclick={handleClose}>
        <X size={20} />
      </button>
    </header>

    <div class="modal-body">
      {@render children()}
    </div>

    {#if footer}
      <footer class="modal-footer">
        {@render footer()}
      </footer>
    {/if}
  </div>
</dialog>

<style>
  .modal {
    width: min(var(--modal-width), calc(100vw - 32px));
    max-width: none;
    max-height: calc(100dvh - 32px);
    padding: 0;
    overflow: auto;
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    box-shadow: 0 12px 40px rgb(0 0 0 / 20%);
  }

  .modal::backdrop {
    background: rgb(0 0 0 / 50%);
    backdrop-filter: blur(2px);
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid var(--color-border);
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .modal-body {
    padding: 24px;
    overflow-y: auto;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px;
    border-top: 1px solid var(--color-border);
  }

  @media (max-width: 480px) {
    .modal-header,
    .modal-body,
    .modal-footer {
      padding: 16px;
    }
  }
</style>
