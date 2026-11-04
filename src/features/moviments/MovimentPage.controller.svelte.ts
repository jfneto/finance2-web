import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { formatToCurrency } from '@lib/utils/numbers'
import { BanknoteArrowDown, BanknoteArrowUp, BanknoteCheck, BanknoteX, Pencil } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import { toast } from 'svelte-sonner'
import type { Moviment } from './moviment'
import { movimentAllOpenQueryOptions } from './querys'

const createMovimentPageController = () => {
  const movimentsQuery = createQuery(() => ({
    ...movimentAllOpenQueryOptions(),
  }))

  let search = $state('')
  let showModal = $state(false)
  let selected = $state<Moviment | undefined>(undefined)

  const columns = [
    {
      key: 'id',
      header: get(_)('moviment.fields.id'),
      width: '70px',
      sortable: true,
    },
    {
      key: 'cred_deb_type',
      header: get(_)('moviment.fields.credDebType'),
      booleanIcons: {
        true: {
          component: BanknoteArrowUp,
          color: 'var(--color-success)',
        },
        false: {
          component: BanknoteArrowDown,
          color: 'var(--color-danger)',
        },
        when: (value) => Number(value) < 1,
      },
      width: '50px',
      sortable: true,
    },
    {
      key: 'details.description',
      header: get(_)('moviment.fields.description'),
      format: (_, row: Moviment) => {
        if (row.details.obs) {
          return row.details.obs
        } else {
          return row.details.description
        }
      },
      sortable: true,
    },

    {
      key: 'dt_due',
      header: get(_)('moviment.fields.dtDue'),
      format: (value) => formatDate(value as string, true),
      width: '116px',
      align: 'right',
      sortable: true,
    },
    {
      key: 'dt_emission',
      header: get(_)('moviment.fields.dtEmission'),
      format: (value) => formatDate(value as string, true),
      width: '115px',
      align: 'right',
      sortable: true,
    },
    {
      key: 'details.number_parcels',
      header: get(_)('moviment.fields.numberParcels'),
      align: 'right',
      width: '175px',
    },
    {
      key: 'details.parcel',
      header: get(_)('moviment.fields.parcel'),
      width: '100px',
      align: 'right',
    },
    {
      key: 'details.value',
      header: get(_)('moviment.fields.value'),
      align: 'right',
      format: (value) => formatToCurrency(value as string),
      width: '160px',
      sortable: true,
    },
    {
      key: 'details.payd_value',
      header: get(_)('moviment.fields.payd'),
      align: 'center',
      booleanIcons: {
        true: {
          component: BanknoteCheck,
          color: 'var(--color-success)',
        },
        false: {
          component: BanknoteX,
          color: 'var(--color-danger)',
        },
        when: (value) => Number(value) > 0,
      },
      width: '70px',
    },
    {
      type: 'actions',
      header: get(_)('actions.header'),
      width: '75px',
      align: 'center',
      actions: (row) => [
        {
          label: get(_)('actions.edit'),
          icon: Pencil,
          onClick: () => {
            if (Number(row.details.payd_value) > 0) {
              toast.error(get(_)('moviment.messages.cannotEditPaydMoviment'))
            } else {
              showModal = true
              selected = row
            }
          },
        },
      ],
    },
  ] satisfies TableColumn<Moviment>[]

  let filteredMoviments = $derived(
    (movimentsQuery.data ?? []).filter((item: Moviment) =>
      item.details.description.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  return {
    movimentsQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredMoviments() {
      return filteredMoviments
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
    set selected(value: Moviment | undefined) {
      selected = value
    },
  }
}

export { createMovimentPageController }
