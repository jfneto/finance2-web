import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { CircleCheck, CircleX, Pencil } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import { categoriesQueryOptions } from './categories.query'
import type { Category } from './category'

const createCategoriesController = () => {
  const categoriesQuery = createQuery(() => ({
    ...categoriesQueryOptions(),
  }))

  let search = $state('')
  let showModal = $state(false)
  let selected = $state<Category | undefined>(undefined)

  const columns = [
    {
      key: 'id',
      header: get(_)('category.fields.id'),
      width: '100px',
    },
    {
      key: 'description',
      header: get(_)('category.fields.description'),
    },
    {
      key: 'category.description',
      header: get(_)('category.fields.categoryId'),
    },
    {
      key: 'category_type',
      header: get(_)('category.fields.categoryType'),
      width: '150px',
    },
    {
      key: 'active',
      header: get(_)('category.fields.active'),
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
          onClick: () => {
            showModal = true
            selected = row
          },
        },
      ],
    },
  ] satisfies TableColumn<Category>[]

  let filteredCategories = $derived(
    (categoriesQuery.data ?? []).filter((item: Category) =>
      item.description.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  return {
    categoriesQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredCategories() {
      return filteredCategories
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
    set selected(value: Category | undefined) {
      selected = value
    },
  }
}

export { createCategoriesController }
