import { queryOptions } from '@tanstack/svelte-query'
import { dashboardApi } from './dashboard.api'

const dashboardQueryKeys = {
  widgetsCredit: () => ['widgets', 'credit'] as const,
  widgetsDebit: () => ['widgets', 'debit'] as const,
  widgetsCreditcard: () => ['widgets', 'creditcard'] as const,
  widgetsPendingInstallments: () => ['widgets', 'pending', 'installments'] as const,
  widgetsSummarizedCreditsDebitsBarChart: () => ['widgets', 'summarized', 'credit', 'debit', 'bar-chart'] as const,
}

const widgetCreditQueryOptions = () =>
  queryOptions({
    queryKey: dashboardQueryKeys.widgetsCredit(),
    queryFn: dashboardApi.widgetCredit,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

const widgetDebitQueryOptions = () =>
  queryOptions({
    queryKey: dashboardQueryKeys.widgetsDebit(),
    queryFn: dashboardApi.widgetDebit,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

const widgetCreditcardQueryOptions = () =>
  queryOptions({
    queryKey: dashboardQueryKeys.widgetsCreditcard(),
    queryFn: dashboardApi.widgetCreditcard,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

const widgetPendingInstallmentsQueryOptions = () =>
  queryOptions({
    queryKey: dashboardQueryKeys.widgetsPendingInstallments(),
    queryFn: dashboardApi.widgetPendingInstallments,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

//
const widgetBarChartSummarizedCreditsDebitsQueryOptions = () =>
  queryOptions({
    queryKey: dashboardQueryKeys.widgetsSummarizedCreditsDebitsBarChart(),
    queryFn: dashboardApi.widgetBarChartSummarizedCreditsDebits,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

export {
  dashboardQueryKeys,
  widgetBarChartSummarizedCreditsDebitsQueryOptions,
  widgetCreditcardQueryOptions,
  widgetCreditQueryOptions,
  widgetDebitQueryOptions,
  widgetPendingInstallmentsQueryOptions,
}
