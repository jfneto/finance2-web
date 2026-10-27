import { api, isError } from '@app/api'
import type { Moviment } from '../moviment'

const movimentAllOpen = async (): Promise<Moviment[]> => {
  const response = await api.get('/api/v1/moviments/actual_period')

  if (isError(response)) {
    return []
  }

  return response.data as Moviment[]
}

export { movimentAllOpen }
