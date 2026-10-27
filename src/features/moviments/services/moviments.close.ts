import { api } from '@app/api'

// FIXME: adicionar tratamento de erros
const movimentClose = async () => {
  const response = await api.post('/api/v1/moviments/actual_period')

  return response.data
}

export { movimentClose }
