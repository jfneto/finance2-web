import { convertTransactionToMoviment, importerStore } from '@features/importer'
import type { Moviment } from '@features/moviments/moviment'
import type { TableColumn } from '@lib/components/ui/table/types'
import type { Transaction } from '@lib/ofx'
import { formatDate } from '@lib/utils/formatDate'
import { formatToCurrency } from '@lib/utils/numbers'
import { BanknoteArrowDown, BanknoteArrowUp, DatabaseArrowUp, Trash } from '@lucide/svelte'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'

const createImporterPageController = () => {
  let search = $state('')
  let showModal = $state(false)
  let selected = $state<Transaction | undefined>(undefined)
  let moviment = $state<Moviment | undefined>(undefined)
  let showMovimentForm = $state(false)

  const columns = [
    {
      key: 'dtPosted',
      header: get(_)('ofx.transaction.dtPosted'),
      format: (value) => formatDate(value as string, true),
      width: '100px',
    },
    {
      key: 'amount',
      header: get(_)('ofx.transaction.amount'),
      format: (value) => formatToCurrency(value as string),
      align: 'right',
      width: '130px',
    },
    {
      key: 'credit',
      header: get(_)('ofx.transaction.credit'),
      booleanIcons: {
        true: {
          component: BanknoteArrowDown,
          color: 'var(--color-danger)',
        },
        false: {
          component: BanknoteArrowUp,
          color: 'var(--color-success)',
        },
        when: (value) => Number(value) < 1,
      },
      width: '100px',
      align: 'center',
    },
    {
      key: 'fitId',
      header: get(_)('ofx.transaction.fitId'),
      width: '300px',
    },
    {
      key: 'memo',
      header: get(_)('ofx.transaction.memo'),
    },
    {
      type: 'actions',
      header: get(_)('actions.header'),
      width: '75px',
      align: 'center',
      actions: (row) => [
        {
          label: get(_)('actions.edit'),
          icon: DatabaseArrowUp,
          color: 'var(--color-primary)',
          onClick: () => {
            selected = row
            moviment = convertTransactionToMoviment(row)
            showMovimentForm = true
          },
        },
        {
          label: get(_)('actions.delete'),
          icon: Trash,
          color: 'var(--color-danger)',
          onClick: () => {
            if (row.fitId !== '') {
              importerStore.removeTransaction(row.fitId || '')
              // needs to run a funcion to delete a transaction from list
            }
          },
        },
      ],
    },
  ] satisfies TableColumn<Transaction>[]

  let filteredTransactions = $derived(
    (importerStore.state.transactions ?? []).filter((item: Transaction) =>
      item.memo?.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  const removeSelectedTransactionConverted = () => {
    if (selected) {
      importerStore.removeTransaction(selected?.fitId || '')
    }
  }

  return {
    columns,
    removeSelectedTransactionConverted,

    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredTransactions() {
      return filteredTransactions
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
    set selected(value: Transaction | undefined) {
      selected = value
    },

    get moviment() {
      return moviment
    },
    set moviment(value: Moviment | undefined) {
      moviment = value
    },

    get showMovimentForm() {
      return showMovimentForm
    },
    set showMovimentForm(value: boolean) {
      showMovimentForm = value
    },
  }
}

export { createImporterPageController }
