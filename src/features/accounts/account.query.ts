import { queryOptions } from '@tanstack/svelte-query'
import { getAccounts } from './services'

const accountQueryKey = ['accounts'] as const

const accountsQueryOptions = () =>
  queryOptions({
    queryKey: accountQueryKey,
    queryFn: getAccounts,
  })

export { accountQueryKey, accountsQueryOptions }
