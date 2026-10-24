<script lang="ts">
  import { routes } from '@app/router'
  import { Router } from '@mateothegreat/svelte5-router'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
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

<QueryClientProvider client={queryClient}>
  <Router
    {routes}
    hooks={{
      pre: authGuard,
    }}
  />
</QueryClientProvider>
