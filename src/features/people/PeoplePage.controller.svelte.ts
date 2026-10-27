import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { Pencil } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import type { Person } from './Person'
import { peopleQueryOptions } from './people.query'

const createPeopleController = () => {
  const peopleQuery = createQuery(() => ({
    ...peopleQueryOptions(),
  }))

  let search = $state('')
  let showModal = $state(false)
  let selected = $state<Person | undefined>(undefined)

  const columns = [
    {
      key: 'id',
      header: get(_)('person.fields.id'),
      width: '100px',
    },
    {
      key: 'name',
      header: get(_)('person.fields.name'),
    },
    {
      key: 'person_type',
      header: get(_)('person.fields.personType'),
      format: (value) => get(_)(`person.personType.${value}`),
      width: '130px',
    },
    {
      key: 'created_at',
      header: get(_)('person.fields.createdAt'),
      format: (value) => formatDate(value as string),
      width: '160px',
    },
    {
      key: 'updated_at',
      header: get(_)('person.fields.updatedAt'),
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
  ] satisfies TableColumn<Person>[]

  let filteredPeople = $derived(
    (peopleQuery.data ?? []).filter((item: Person) => item.name.toLowerCase().includes(search.toLowerCase())),
  )

  return {
    peopleQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredPeople() {
      return filteredPeople
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
    set selected(value: Person | undefined) {
      selected = value
    },
  }
}

export { createPeopleController }
