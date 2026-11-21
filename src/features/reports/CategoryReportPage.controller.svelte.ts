import { createQuery } from '@tanstack/svelte-query'
import { categoryByPeriodQueryOptions } from './reports.query'

const createCategoryReportController = () => {
  const categoryQuery = createQuery(() => ({
    ...categoryByPeriodQueryOptions(),
  }))

  return {
    categoryQuery,
  }
}

export { createCategoryReportController }
