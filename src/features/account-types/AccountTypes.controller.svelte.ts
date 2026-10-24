import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { CircleCheck, CircleX } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import type { AccountType } from './account-type'
import { accountTypesQueryOptions } from './account-types.query'

const createAccountTypesController = () => {
  const accountTypesQuery = createQuery(() => ({
    ...accountTypesQueryOptions(),
  }))

  let search = $state('')

  const columns = [
    {
      key: 'id',
      header: get(_)('accountType.fields.id'),
      width: '100px',
    },
    {
      key: 'description',
      header: get(_)('accountType.fields.description'),
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
  ] satisfies TableColumn<AccountType>[]

  let filteredAccountTypes = $derived(
    (accountTypesQuery.data ?? []).filter((item: AccountType) =>
      item.description.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  return {
    accountTypesQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredAccountTypes() {
      return filteredAccountTypes
    },
  }
}

export { createAccountTypesController }
