<script lang="ts">
  import { routes } from '@app/router'
  import ConfirmDialogHost from '@lib/components/ui/dialogs/ConfirmDialogHost.svelte'
  import { Router } from '@mateothegreat/svelte5-router'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import { onMount } from 'svelte'
  import { Toaster } from 'svelte-sonner'
  import { authGuard } from './app/guards'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // os dados são considerados atualizados por 5 minutos.
        gcTime: 30 * 60 * 1000, // dados sem componentes utilizando a consulta podem permanecer no cache por até 30 minutos.
        retry: 1, // uma requisição que falhar será tentada novamente uma vez.
      },
    },
  })

  onMount(() => {
    const toastLayer = document.querySelector<HTMLElement>('#toast-top-layer')

    if (!toastLayer) return

    toastLayer.showPopover()

    const observer = new MutationObserver((mutations) => {
      const dialogOpened = mutations.some(
        (mutation) =>
          mutation.type === 'attributes' &&
          mutation.attributeName === 'open' &&
          mutation.target instanceof HTMLDialogElement &&
          mutation.target.open,
      )

      if (dialogOpened && toastLayer.matches(':popover-open')) {
        toastLayer.hidePopover()
        toastLayer.showPopover()
      }
    })

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['open'],
    })

    return () => observer.disconnect()
  })
</script>

<div id="toast-top-layer" popover="manual">
  <Toaster position="top-right" richColors />
</div>

<ConfirmDialogHost />

<QueryClientProvider client={queryClient}>
  <Router
    {routes}
    hooks={{
      pre: authGuard,
    }}
  />
</QueryClientProvider>

<!--
import { toast } from 'svelte-sonner'

toast.success('Conta criada com sucesso')
toast.error('Erro ao salvar a conta')
toast.warning('Verifique os campos do formulário')
toast.info('Operação em andamento')
-->
