import { createQuery } from '@tanstack/svelte-query'
import {
  widgetBarChartSummarizedCreditsDebitsQueryOptions,
  widgetCreditcardQueryOptions,
  widgetCreditQueryOptions,
  widgetDebitQueryOptions,
  widgetPendingInstallmentsQueryOptions,
} from './dashboard.query'

const createDashboardController = () => {
  const widgetCreditQuery = createQuery(() => ({
    ...widgetCreditQueryOptions(),
  }))

  const widgetDebitQuery = createQuery(() => ({
    ...widgetDebitQueryOptions(),
  }))

  const widgetCreditcard = createQuery(() => ({
    ...widgetCreditcardQueryOptions(),
  }))

  const widgetPendingInstallments = createQuery(() => ({
    ...widgetPendingInstallmentsQueryOptions(),
  }))

  const widgetBarChartSummarizedCreditsDebits = createQuery(() => ({
    ...widgetBarChartSummarizedCreditsDebitsQueryOptions(),
  }))

  return {
    widgetCreditQuery,
    widgetDebitQuery,
    widgetCreditcard,
    widgetPendingInstallments,
    widgetBarChartSummarizedCreditsDebits,
  }
}

export { createDashboardController }
