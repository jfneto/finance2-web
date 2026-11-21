import { queryOptions } from '@tanstack/svelte-query'
import { reportsApi } from './reports.api'

const extractByPeriodQueryOptions = () =>
  queryOptions({
    queryKey: ['reports', 'extract-by-period'],
    queryFn: reportsApi.extractFromLast12Months,
  })

const categoryByPeriodQueryOptions = (period: number) =>
  queryOptions({
    queryKey: ['reports', 'category-by-period', period],
    queryFn: () => reportsApi.extractBySelectedPeriod(period),
  })

export { categoryByPeriodQueryOptions, extractByPeriodQueryOptions }
