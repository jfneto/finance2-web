import type { Category } from '@features/categories'
import { categoriesQueryOptions } from '@features/categories/categories.query'
import { paymentFormsQueryOptions } from '@features/payment-forms/paymentForms.query'
import { peopleQueryOptions } from '@features/people/people.query'
import { StringOrDefault, StringOrEmpty, StringOrUndefined } from '@lib/utils/string'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import { toast } from 'svelte-sonner'
import type { Moviment, MovimentPayload } from './moviment'
import { movimentCreate, movimentUpdate } from './services'

interface Props {
  onClose?: () => void
  onSaved?: () => void
}

const createMovimentFormController = ({ onClose = () => {}, onSaved = () => {} }: Props) => {
  const paymentFormsQuery = createQuery(() => ({
    ...paymentFormsQueryOptions(),
  }))
  const categoriesQuery = createQuery(() => ({
    ...categoriesQueryOptions(),
  }))
  const peopleQuery = createQuery(() => ({
    ...peopleQueryOptions(),
  }))
  const movimentTypeOptions = [
    { id: 0, label: get(_)('moviment.credDebType.credit') },
    { id: 1, label: get(_)('moviment.credDebType.debit') },
  ]

  let id = $state<number | undefined>(undefined)
  let type = $state<string>('1')
  let description = $state<string>('')
  let paymentForm = $state<string>('')
  let categoryId = $state<string | undefined>(undefined)
  let obs = $state<string>('')
  let fitId = $state<string>('')
  let parcelsNumber = $state<string>('')
  let parcel = $state<string>('')
  let value = $state<string>('')
  let emission = $state<string>('')
  let vencto = $state<string>('')
  let personId = $state<string>('')

  const initState = (selected?: Moviment) => {
    id = selected?.id ?? undefined
    type = String(selected?.cred_deb_type) ?? 1 // padrão débito
    description = StringOrEmpty(selected?.details.description)
    paymentForm = StringOrEmpty(selected?.payment_form?.id)
    categoryId = StringOrUndefined(selected?.category?.id)
    obs = StringOrEmpty(selected?.details.obs)
    fitId = StringOrEmpty(selected?.details.fit_id)
    parcelsNumber = StringOrEmpty(selected?.details.number_parcels)
    parcel = StringOrEmpty(selected?.details.parcel)
    value = StringOrDefault(selected?.details.value, '0.00')
    emission = StringOrEmpty(selected?.dt_emission)
    vencto = StringOrEmpty(selected?.dt_due)
    personId = StringOrEmpty(selected?.person?.id)
  }

  const handleOnSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // seguir daqui e montar o payload tipado e carregar o evento de envio para o backend
    const payload: MovimentPayload = {
      id: Number(id) ?? undefined,
      cred_deb_type: Number(type),
      description: description,
      payment_form_id: Number(paymentForm) ?? undefined,
      category_id: Number(categoryId) ?? undefined,
      obs: obs,
      fit_id: Number(fitId),
      number_parcels: Number(parcelsNumber) ?? undefined,
      parcel: Number(parcel) ?? undefined,
      value: Number(value) ?? 0.0,
      dt_emission: emission,
      dt_due: vencto,
      payd_value: 0.0,
      accounted_for: false,
      person_id: Number(personId) ?? undefined,
    }

    if (id === undefined) {
      movimentCreate(payload)
        .then(() => {
          toast.success('Movimento criado com sucesso')
          onClose?.()
          onSaved?.()
        })
        .catch(() => {
          toast.error('não foi possivel criar o Movimento')
        })
    } else {
      movimentUpdate(payload)
        .then(() => {
          toast.success('Movimento atualizada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possível atualizar a Movimento')
        })
    }
  }

  const categoryTypeOptions = [
    { id: '0', label: 'Crédito' },
    { id: '1', label: 'Debito' },
  ]

  let filteredCategories = $derived(
    (categoriesQuery.data ?? []).filter((item: Category) =>
      item.category_type.toUpperCase().includes(type === '0' ? 'CREDIT' : 'DEBIT'),
    ),
  )

  return {
    initState,
    paymentFormsQuery,
    movimentTypeOptions,
    categoriesQuery,
    peopleQuery,

    handleOnSubmit,
    categoryTypeOptions,

    get id() {
      return id
    },
    set id(value) {
      id = value
    },

    get type() {
      return type
    },
    set type(value) {
      type = value
    },

    get description() {
      return description
    },
    set description(value) {
      description = value
    },

    get paymentForm() {
      return paymentForm
    },
    set paymentForm(value) {
      paymentForm = value
    },

    get categoryId() {
      return categoryId
    },
    set categoryId(value) {
      categoryId = value
    },

    get obs() {
      return obs
    },
    set obs(value) {
      obs = value
    },

    get fitId() {
      return fitId
    },
    set fitId(value) {
      fitId = value
    },

    get parcelsNumber() {
      return parcelsNumber
    },
    set parcelsNumber(value) {
      parcelsNumber = value
    },

    get parcel() {
      return parcel
    },
    set parcel(value) {
      parcel = value
    },

    get value() {
      return value
    },
    set value(value) {
      this.value = value
    },

    get emission() {
      return emission
    },
    set emission(value) {
      emission = value
    },

    get vencto() {
      return vencto
    },
    set vencto(value) {
      vencto = value
    },

    get filteredCategories() {
      return filteredCategories
    },

    get personId() {
      return personId
    },
    set personId(value) {
      personId = value
    },
  }
}

export { createMovimentFormController }
