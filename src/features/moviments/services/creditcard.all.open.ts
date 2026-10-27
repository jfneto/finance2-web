import { api, isError } from '@app/api'
import type { Moviment } from '../moviment'

const creditcardAllOpen = async (): Promise<Moviment[]> => {
  const response = await api.get('/api/v1/moviments/credit_card')

  if (isError(response)) {
    return []
  }

  return response.data as Moviment[]
}

export { creditcardAllOpen }
