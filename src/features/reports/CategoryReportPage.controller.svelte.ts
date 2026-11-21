import { periodsForFilterQueryOptions } from '@features/periods/period.query'
import { createQuery } from '@tanstack/svelte-query'
import { categoryByPeriodQueryOptions } from './reports.query'

const createCategoryReportController = () => {
  const ui = $state({
    selectedPeriodId: undefined as number | undefined,
  })

  const categoryQuery = createQuery(() => ({
    ...categoryByPeriodQueryOptions(ui.selectedPeriodId ?? 0),
    enabled: ui.selectedPeriodId !== undefined,
  }))

  const periodsQuery = createQuery(() => ({
    ...periodsForFilterQueryOptions(),
  }))

  return {
    categoryQuery,
    periodsQuery,
    get selectedPeriodId() {
      return ui.selectedPeriodId
    },
    set selectedPeriodId(value: number | undefined) {
      ui.selectedPeriodId = value
    },
  }
}

export { createCategoryReportController }
