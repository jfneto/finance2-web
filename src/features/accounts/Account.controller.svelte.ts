import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { formatToCurrency } from '@lib/utils/numbers'
import { CircleCheck, CircleX, Pencil } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import type { Account } from './account'
import { accountsQueryOptions } from './account.query'

const createAccountsController = () => {
  const accountQuery = createQuery(() => ({
    ...accountsQueryOptions(),
  }))

  let search = $state('')
  let showModal = $state(false)

  const columns = [
    {
      key: 'id',
      header: get(_)('account.fields.id'),
      width: '100px',
    },
    {
      key: 'account_type_desc',
      header: get(_)('account.fields.accountTypeId'),
    },
    {
      key: 'name',
      header: get(_)('account.fields.name'),
    },
    {
      key: 'balance',
      header: get(_)('account.fields.balance'),
      align: 'right',
      format: (value) => formatToCurrency(value as string),
      width: '150px',
    },
    {
      key: 'active',
      header: get(_)('accountType.fields.active'),
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
      key: 'created_at',
      header: get(_)('accountType.fields.createdAt'),
      format: (value) => formatDate(value as string),
      width: '160px',
    },
    {
      key: 'updated_at',
      header: get(_)('accountType.fields.updatedAt'),
      format: (value) => formatDate(value as string),
      width: '160px',
    },
    {
      type: 'actions',
      header: get(_)('actions.header'),
      width: '100px',
      align: 'center',
      actions: (row) => [
        {
          label: get(_)('actions.edit'),
          icon: Pencil,
          onClick: () => {},
        },
      ],
    },
  ] satisfies TableColumn<Account>[]

  let filteredAccountTypes = $derived(
    (accountQuery.data ?? []).filter((item: Account) => item.name.toLowerCase().includes(search.toLowerCase())),
  )

  return {
    accountQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredAccounts() {
      return filteredAccountTypes
    },
    get showModal() {
      return showModal
    },
    set showModal(value: boolean) {
      showModal = value
    },
  }
}

export { createAccountsController }
