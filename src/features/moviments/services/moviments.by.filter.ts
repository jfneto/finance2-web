import { api } from '@app/api'
import type { MovimentPayload, MovimentPayloadForSearch } from '../moviment'

const movimentByFilter = async (payload: MovimentPayloadForSearch): Promise<MovimentPayload> => {
  const response = await api.post('/api/v1/moviments/find_by_date_and_description', payload)

  return response.data as MovimentPayload
}

export { movimentByFilter }
