import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { CircleCheck, CircleX, Pencil } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import type { PaymentForm } from './paymentForm'
import { paymentFormsQueryOptions } from './paymentForms.query'

const createPaymentFormController = () => {
  const paymentFormQuery = createQuery(() => ({
    ...paymentFormsQueryOptions(),
  }))

  let search = $state('')
  let showModal = $state(false)
  let selected = $state<PaymentForm | undefined>(undefined)

  const columns = [
    {
      key: 'id',
      header: get(_)('paymentForm.fields.id'),
      width: '100px',
    },
    {
      key: 'description',
      header: get(_)('paymentForm.fields.description'),
    },
    {
      key: 'account.name',
      header: get(_)('paymentForm.fields.account.name'),
    },
    {
      key: 'category.description',
      header: get(_)('paymentForm.fields.categoryDesc'),
    },
    {
      key: 'active',
      header: get(_)('paymentForm.fields.active'),
      align: 'center',
      booleanIcons: {
        true: {
          component: CircleCheck,
          color: 'var(--color-success)',
        },
        false: {
          component: CircleX,
          color: 'var(--color-danger)',
        },
      },
      width: '70px',
    },
    {
      key: 'is_cc',
      header: get(_)('paymentForm.fields.isCC'),
      align: 'center',
      booleanIcons: {
        true: {
          component: CircleCheck,
          color: 'var(--color-success)',
        },
        false: {
          component: CircleX,
          color: 'var(--color-danger)',
        },
      },
      width: '70px',
    },
    {
      key: 'is_default_payment_cc',
      header: get(_)('paymentForm.fields.isDefaultPaymentCc'),
      align: 'center',
      booleanIcons: {
        true: {
          component: CircleCheck,
          color: 'var(--color-success)',
        },
        false: {
          component: CircleX,
          color: 'var(--color-danger)',
        },
      },
      width: '100px',
    },
    {
      key: 'day_due',
      header: get(_)('paymentForm.fields.dayDue'),
      width: '110px',
    },
    {
      key: 'created_at',
      header: get(_)('paymentForm.fields.createdAt'),
      format: (value) => formatDate(value as string),
      width: '160px',
    },
    {
      key: 'updated_at',
      header: get(_)('paymentForm.fields.updatedAt'),
      format: (value) => formatDate(value as string),
      width: '160px',
    },
    // {
    //   type: 'actions',
    //   header: get(_)('actions.header'),
    //   width: '100px',
    //   align: 'center',
    //   actions: (row) => [
    //     {
    //       label: get(_)('actions.edit'),
    //       icon: Pencil,
    //       onClick: () => {
    //         showModal = true
    //         console.log(row)
    //         selected = row
    //       },
    //     },
    //   ],
    // },
  ] satisfies TableColumn<PaymentForm>[]

  let filteredpaymentForms = $derived(
    (paymentFormQuery.data ?? []).filter((item: PaymentForm) =>
      item.description.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  return {
    paymentFormQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredpaymentForms() {
      return filteredpaymentForms
    },
    get showModal() {
      return showModal
    },
    set showModal(value: boolean) {
      showModal = value
    },

    get selected() {
      return selected
    },
    set selected(value: PaymentForm | undefined) {
      selected = value
    },
  }
}

export { createPaymentFormController }
