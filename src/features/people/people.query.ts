import { queryOptions } from '@tanstack/svelte-query'
import { peopleAll } from './services'

const peopleQueryKey = ['people'] as const

const peopleQueryOptions = () =>
  queryOptions({
    queryKey: peopleQueryKey,
    queryFn: peopleAll,
  })

export { peopleQueryKey, peopleQueryOptions }
