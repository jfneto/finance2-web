import { queryOptions } from '@tanstack/svelte-query'
import { getAccountTypes } from './account-types.get'

const accountTypesQueryKey = ['accountTypes'] as const

const accountTypesQueryOptions = () =>
  queryOptions({
    queryKey: accountTypesQueryKey,
    queryFn: getAccountTypes,
  })

export { accountTypesQueryKey, accountTypesQueryOptions }
