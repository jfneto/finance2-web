import { api } from '@app/api'
import type { PaymentForm, PaymentFormPayload } from '@features/payment-forms'

const paymentFormUpdate = async (payload: PaymentFormPayload): Promise<PaymentForm> => {
  const response = await api.patch(`/api/v1/payment_forms/${payload.id.toString()}`, payload)

  return response.data as PaymentForm
}

export { paymentFormUpdate }
