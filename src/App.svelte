<script lang="ts">
  import { routes } from '@app/router'
  import ConfirmDialogHost from '@lib/components/ui/dialogs/ConfirmDialogHost.svelte'
  import { Router } from '@mateothegreat/svelte5-router'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
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
</script>

<Toaster position="top-right" richColors />

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
