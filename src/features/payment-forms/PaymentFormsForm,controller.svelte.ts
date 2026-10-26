import { StringOrEmpty, StringOrUndefined } from '@lib/utils/string'
import { createQuery } from '@tanstack/svelte-query'
import { toast } from 'svelte-sonner'
import type { PaymentForm, PaymentFormPayload } from './paymentForm'
import { paymentFormsQueryOptions } from './paymentForms.query'
import { paymentFormCreate, paymentFormUpdate } from './services'

const createPaymentFormsFormController = (onSubmitted?: () => void) => {
  const paymentsFormQuery = createQuery(() => ({
    ...paymentFormsQueryOptions(),
  }))

  let id = $state<number | undefined>(undefined)
  let active = $state<boolean>(false)
  let description = $state<string>('')
  let accountId = $state<string>('')
  let categoryId = $state<string | undefined>(undefined)

  let isCC = $state<boolean>(false)
  let isDefaultPaymentCC = $state<boolean>(false)
  let dayDue = $state<string>('')
  let dayClosed = $state<string>('')

  const initState = (selected?: PaymentForm) => {
    id = selected?.id ?? undefined
    active = selected?.active ?? false
    description = StringOrEmpty(selected?.description)
    categoryId = StringOrUndefined(selected?.category?.id)
    accountId = StringOrEmpty(selected?.account?.id)

    isCC = selected?.is_cc ?? false
    isDefaultPaymentCC = selected?.is_default_payment_cc ?? false

    dayDue = StringOrEmpty(selected?.day_due)
    dayClosed = StringOrEmpty(selected?.day_closed)
  }

  const handleOnSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // seguir daqui e montar o payload tipado e carregar o evento de envio para o backend
    const payload: PaymentFormPayload = {
      id: Number(id) ?? undefined,
      active: active,
      description: description,
      account_id: Number(accountId),
      category_id: Number(categoryId) ?? undefined,
      is_cc: isCC,
      is_default_payment_cc: isDefaultPaymentCC,
      day_due: Number(dayDue) ?? undefined,
      day_closed: Number(dayClosed) ?? undefined,
    }

    onSubmitted?.()

    if (id === undefined) {
      paymentFormCreate(payload)
        .then(() => {
          toast.success('Forma de pagamento criada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possivel criar a Forma de pagamento')
        })
    } else {
      paymentFormUpdate(payload)
        .then(() => {
          toast.success('Forma de pagamento atualizada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possível atualizar a Forma de pagamento')
        })
    }
  }

  return {
    initState,
    paymentsFormQuery,
    handleOnSubmit,

    get id() {
      return id
    },
    set id(value) {
      id = value
    },
    get active() {
      return active
    },
    set active(value) {
      active = value
    },
    get description() {
      return description
    },
    set description(value) {
      description = value
    },
    get categoryId() {
      return categoryId
    },
    set categoryId(value) {
      categoryId = value
    },
  }
}

export { createPaymentFormsFormController }
