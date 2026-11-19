import { api } from '@app/api'
import type { DashboardPendingWidget, DashboardWidget } from '@features/dashboard'

const widgetCredit = async (): Promise<DashboardWidget> => {
  const response = await api.get('/api/v1/dashboard/widget/credit')

  console.log('credit', response.data as DashboardWidget)

  return response.data as DashboardWidget
}

const widgetDebit = async (): Promise<DashboardWidget> => {
  const response = await api.get('/api/v1/dashboard/widget/debit')

  return response.data as DashboardWidget
}

const widgetCreditcard = async (): Promise<DashboardWidget> => {
  const response = await api.get('/api/v1/dashboard/widget/creditcard')

  return response.data as DashboardWidget
}

const widgetPendingInstallments = async (): Promise<DashboardPendingWidget> => {
  const response = await api.get('/api/v1/dashboard/widget/pending_installments')

  return response.data as DashboardPendingWidget
}

const widgetBarChartSummarizedCreditsDebits = async (): Promise<any> => {
  const response = await api.get('/api/v1/dashboard/widget/summarized_credits_debits_data')

  return response.data
}

export const dashboardApi = {
  widgetCredit,
  widgetDebit,
  widgetCreditcard,
  widgetPendingInstallments,
  widgetBarChartSummarizedCreditsDebits,
}
