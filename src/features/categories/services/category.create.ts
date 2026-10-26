import { api } from '@app/api'
import type { Category, CategoryPayload } from '@features/categories'

const categoryCreate = async (payload: CategoryPayload): Promise<Category> => {
  const response = await api.post('/api/v1/categories', payload)
  return response.data as Category
}

export { categoryCreate }
