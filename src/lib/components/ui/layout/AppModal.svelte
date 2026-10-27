<script lang="ts">
  import { X } from '@lucide/svelte'
  import type { Snippet } from 'svelte'
  import { tick } from 'svelte'

  interface Props {
    open: boolean
    title: string
    children: Snippet
    footer?: Snippet
    width?: string
    onClose: () => void
    closeOnBackdropClick?: boolean
  }

  let {
    open = $bindable(false),
    title,
    children,
    footer,
    width = '480px',
    onClose,
    closeOnBackdropClick = false,
  }: Props = $props()

  let dialogElement = $state<HTMLDivElement>()
  let previousFocus: HTMLElement | null = null
  let wasOpen = false

  const handleClose = () => {
    if (!open) return

    open = false
    onClose()
  }

  const backdropAction = (element: HTMLDivElement) => {
    const handleClick = (event: MouseEvent) => {
      if (event.target === element && closeOnBackdropClick) {
        handleClose()
      }
    }

    element.addEventListener('click', handleClick)

    return {
      destroy: () => {
        element.removeEventListener('click', handleClick)
      },
    }
  }

  const getFocusableElements = () => {
    if (!dialogElement) return []

    return [
      ...dialogElement.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.offsetParent !== null)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (!open || !dialogElement) return

    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      handleClose()
      return
    }

    if (event.key !== 'Tab') return

    const focusable = getFocusableElements()

    if (focusable.length === 0) {
      event.preventDefault()
      dialogElement.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const focusIsInside = dialogElement.contains(document.activeElement)

    if (event.shiftKey && (document.activeElement === first || !focusIsInside)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (document.activeElement === last || !focusIsInside)) {
      event.preventDefault()
      first.focus()
    }
  }

  $effect(() => {
    if (open && !wasOpen) {
      wasOpen = true
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null

      void tick().then(() => {
        if (!open || !dialogElement) return

        const firstFocusable = getFocusableElements()[0]
        ;(firstFocusable ?? dialogElement).focus()
      })
    } else if (!open && wasOpen) {
      wasOpen = false

      const focusTarget = previousFocus
      previousFocus = null

      void tick().then(() => {
        if (focusTarget?.isConnected) {
          focusTarget.focus()
        }
      })
    }
  })

  $effect(() => {
    if (!open) return

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })
</script>

{#if open}
  <div use:backdropAction class="modal-backdrop" role="presentation">
    <div
      bind:this={dialogElement}
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabindex="-1"
      style:--modal-width={width}
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
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    overflow-y: auto;
    background: rgb(0 0 0 / 50%);
    backdrop-filter: blur(2px);
  }

  .modal {
    width: min(var(--modal-width), calc(100vw - 32px));
    max-height: calc(100dvh - 32px);
    overflow: auto;
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    box-shadow: 0 12px 40px rgb(0 0 0 / 20%);
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
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border);
  }

  .modal-header h2 {
    margin: 0;
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
    padding: 20px;
    overflow-y: auto;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 20px;
    border-top: 1px solid var(--color-border);
  }

  @media (prefers-reduced-motion: no-preference) {
    .modal {
      animation: modal-enter 120ms ease-out;
    }

    @keyframes modal-enter {
      from {
        opacity: 0;
        transform: translateY(4px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
