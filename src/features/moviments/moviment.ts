import type { CategorySimple } from '@features/categories'
import type { PaymentFormSimple } from '@features/payment-forms'
import type { PersonSimple } from '@features/people'
import type { PeriodSimple } from '@features/periods'

interface Details {
  grid?: string
  description: string
  obs?: string
  num_docto: string
  fit_id: string
  number_parcels: number
  parcel: number
  value: string
  payd_value: string
}

export type { Details }

interface Moviment {
  id?: number
  cred_deb_type: number
  details: Details
  dt_emission: string
  dt_due: string
  category?: CategorySimple
  period?: PeriodSimple
  payment_form?: PaymentFormSimple
  owner?: number
  person?: PersonSimple
  payd?: boolean
}

interface MovimentPayload {
  id: number
  accounted_for: boolean
  cred_deb_type: number
  description: string
  dt_due: string
  dt_emission: string
  value: number
  category_id: number
  period_id?: number
  payd_value: number
  payment_form_id: number
  moviment_id?: number
  num_docto?: string
  fit_id?: number
  obs?: string
  number_parcels?: number
  parcel?: number
  person_id?: number
}

interface MovimentPayloadForSearch {
  dt_emission: string
  description: string
  number_parcels: number
  parcel: number
}

export type { Moviment, MovimentPayload, MovimentPayloadForSearch }
