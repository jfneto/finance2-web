import { api } from '@app/api'
import type { Period, PeriodOptions } from '@features/periods'

const all = async (): Promise<Period[]> => {
  const response = await api.get('/api/v1/periods')

  return response.data as Period[]
}

const close = async (): Promise<Period> => {
  const response = await api.post('/api/v1/periods/close')
  return response.data as Period
}

const forFilter = async (): Promise<PeriodOptions[]> => {
  const response = await api.get('/api/v1/periods/for_filter')

  return response.data as PeriodOptions[]
}

export const periodApi = { all, close, forFilter }
