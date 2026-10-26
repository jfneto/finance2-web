import { categoriesAll } from '@features/categories/services'
import { queryOptions } from '@tanstack/svelte-query'

const categoriesQueryKey = ['categories'] as const

const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: categoriesQueryKey,
    queryFn: categoriesAll,
  })

export { categoriesQueryKey, categoriesQueryOptions }
