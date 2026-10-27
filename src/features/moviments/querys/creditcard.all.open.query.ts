import { queryOptions } from '@tanstack/svelte-query'
import { creditcardAllOpen } from '../services'

const creditcardAllOpenQueryKey = ['creditcard-all-open'] as const

const creditcardAllOpenQueryOptions = () =>
  queryOptions({
    queryKey: creditcardAllOpenQueryKey,
    queryFn: creditcardAllOpen,
  })

export { creditcardAllOpenQueryKey, creditcardAllOpenQueryOptions }
