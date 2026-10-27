import type { AccountSimple } from '@features/accounts/account'
import type { CategorySimple } from '@features/categories'

interface PaymentFormSimple {
  id: number
  description: string
}

interface PaymentForm {
  id: number
  description: string
  account: AccountSimple
  active: boolean
  created_at?: string
  updated_at?: string
  is_cc: boolean
  day_due?: number
  day_closed?: number
  is_default_payment_cc?: boolean
  category: CategorySimple
}

interface PaymentFormPayload {
  id: number
  description: string
  account_id: number
  active: boolean
  is_cc: boolean
  day_due?: number
  day_closed?: number
  is_default_payment_cc?: boolean
  category_id: number
}

export type { PaymentForm, PaymentFormPayload, PaymentFormSimple }
