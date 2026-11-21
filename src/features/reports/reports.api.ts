import { api } from '@app/api'
import type { CategoryNode, ExtractPeriod } from './types'

const extractFromLast12Months = async (): Promise<ExtractPeriod[]> => {
  const response = await api.get('/api/v1/extract/moviments/by/period')
  return response.data as ExtractPeriod[]
}

const extractBySelectedPeriod = async (id: number): Promise<CategoryNode[]> => {
  const payload = {
    id,
  }
  const response = await api.post('/api/v1/extract/moviments/show_by_period', payload)
  return response.data as CategoryNode[]
}

export const reportsApi = { extractFromLast12Months, extractBySelectedPeriod }
