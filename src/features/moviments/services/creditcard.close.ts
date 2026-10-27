import { api } from '@app/api'

const creditcardClose = async () => {
  const response = await api.post('/api/v1/moviments/credit_card')

  if (
    response.data.message === 'success' ||
    response.data.message === 'Moviments was successfully closed.' ||
    response.data.success === true
  ) {
    return true
  }

  return response.data
}

export { creditcardClose }
