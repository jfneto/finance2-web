import { api } from '@app/api'
import type { CategoryNode } from '../types'

const categoryByPeriod = async (): Promise<CategoryNode[]> => {
  const response = await api.get('/api/v1/extract/moviments/show_by_period')
  return response.data as CategoryNode[]
}

export { categoryByPeriod }
