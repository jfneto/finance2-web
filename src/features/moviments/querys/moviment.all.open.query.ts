import { queryOptions } from '@tanstack/svelte-query'
import { movimentAllOpen } from '../services'

const movimentsAllOpenQueryKey = ['moviments-all-open'] as const

const movimentAllOpenQueryOptions = () =>
  queryOptions({
    queryKey: movimentsAllOpenQueryKey,
    queryFn: movimentAllOpen,
  })

export { movimentAllOpenQueryOptions, movimentsAllOpenQueryKey }
