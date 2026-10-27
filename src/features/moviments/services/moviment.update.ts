import { api } from '@app/api'
import type { Moviment, MovimentPayload } from '../moviment'

const movimentUpdate = async (payload: MovimentPayload): Promise<Moviment> => {
  const response = await api.patch(`/api/v1/moviments/${payload.id}`, payload)

  return response.data as Moviment
}

export { movimentUpdate }
