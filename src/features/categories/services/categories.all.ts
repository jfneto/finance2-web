import { api } from '@app/api'
import type { Category } from '@features/categories'

const categoriesAll = async (): Promise<Category[]> => {
  const response = await api.get('/api/v1/categories')

  return response.data as Category[]
}

export { categoriesAll }
