import { api } from '@app/api'
import type { Period } from '@features/periods'

const periodAll = async (): Promise<Period[]> => {
  const response = await api.get('/api/v1/periods')

  return response.data as Period[]
}

export { periodAll }
