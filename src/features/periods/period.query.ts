import { queryOptions } from '@tanstack/svelte-query'
import { periodApi } from './period.api'

const periodQueryKey = ['periods'] as const

const periodsQueryOptions = () =>
  queryOptions({
    queryKey: periodQueryKey,
    queryFn: periodApi.all,
  })

const periodsForFilterQueryOptions = () =>
  queryOptions({
    queryKey: periodQueryKey,
    queryFn: periodApi.forFilter,
  })

export { periodsForFilterQueryOptions, periodsQueryOptions }
