import { api } from '@app/api'
import type { PaymentForm } from '@features/payment-forms'

const paymentFormAll = async (): Promise<PaymentForm[]> => {
  const response = await api.get('/api/v1/payment_forms')

  return response.data as PaymentForm[]
}

export { paymentFormAll }
