import { queryOptions } from '@tanstack/svelte-query'
import { paymentFormAll } from './services'

const paymentFormsQueryKey = ['payment-forms'] as const

const paymentFormsQueryOptions = () =>
  queryOptions({
    queryKey: paymentFormsQueryKey,
    queryFn: paymentFormAll,
  })

export { paymentFormsQueryKey, paymentFormsQueryOptions }
