import { createQuery } from '@tanstack/svelte-query'
import { categoryByPeriod, extractByPeriod } from './services'

const extractByPeriodQueryOptions = () => ({
  queryKey: ['reports', 'extract-by-period'],
  queryFn: extractByPeriod,
})

const categoryByPeriodQueryOptions = () => ({
  queryKey: ['reports', 'category-by-period'],
  queryFn: categoryByPeriod,
})

export { categoryByPeriodQueryOptions, extractByPeriodQueryOptions }
