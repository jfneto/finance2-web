import { queryOptions } from '@tanstack/svelte-query'
import { periodAll } from './services'

const periodQueryKey = ['periods'] as const

const periodsQueryOptions = () =>
  queryOptions({
    queryKey: periodQueryKey,
    queryFn: periodAll,
  })

export { periodQueryKey, periodsQueryOptions }
