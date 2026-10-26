import { api } from '@app/api'
import type { Category, CategoryPayload } from '@features/categories'

const categoryUpdate = async (payload: CategoryPayload): Promise<Category> => {
  const response = await api.patch(`/api/v1/categories/${payload.id}`, payload)

  return response.data as Category
}

export { categoryUpdate }
