import { api } from '@app/api'
import type { PaymentForm, PaymentFormPayload } from '@features/payment-forms'

const paymentFormCreate = async (payload: PaymentFormPayload): Promise<PaymentForm> => {
  const response = await api.post('/api/v1/payment_forms', payload)
  return response.data as PaymentForm
}

export { paymentFormCreate }
