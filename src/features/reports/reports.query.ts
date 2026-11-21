import { queryOptions } from '@tanstack/svelte-query'
import { categoryByPeriod, extractByPeriod } from './services'

const extractByPeriodQueryOptions = () =>
  queryOptions({
    queryKey: ['reports', 'extract-by-period'],
    queryFn: extractByPeriod,
  })

const categoryByPeriodQueryOptions = () =>
  queryOptions({
    queryKey: ['reports', 'category-by-period'],
    queryFn: categoryByPeriod,
  })

export { categoryByPeriodQueryOptions, extractByPeriodQueryOptions }
