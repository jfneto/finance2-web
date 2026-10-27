import { api } from '@app/api'
import type { Moviment, MovimentPayload } from '../moviment'

const movimentCreate = async (payload: MovimentPayload): Promise<Moviment> => {
  const response = await api.post('/api/v1/moviments', payload)
  return response.data as Moviment
}

export { movimentCreate }
