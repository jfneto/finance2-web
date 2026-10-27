import { api } from '@app/api'
import type { Period } from '@features/periods'

const periodClose = async (): Promise<Period> => {
  const response = await api.post('/api/v1/periods/close')
  return response.data as Period
}

export { periodClose }
