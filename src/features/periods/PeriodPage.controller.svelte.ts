import { confirmDialog } from '@lib/components/ui/dialogs/confirm.svelte'
import type { TableColumn } from '@lib/components/ui/table/types'
import { formatDate } from '@lib/utils/formatDate'
import { CircleCheck, CircleX, Lock, LockOpen } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import { toast } from 'svelte-sonner'
import type { Period } from './Period'
import { periodsQueryOptions } from './period.query'
import { periodClose } from './services'

const createPeriodController = () => {
  const periodQuery = createQuery(() => ({
    ...periodsQueryOptions(),
  }))

  let search = $state('')
  let showModal = $state(false)
  let selected = $state<Period | undefined>(undefined)

  const columns = [
    {
      key: 'id',
      header: get(_)('period.fields.id'),
      width: '100px',
    },
    {
      key: 'closed',
      header: get(_)('period.fields.closed'),
      sortable: true,
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
    },
    {
      key: 'month',
      header: get(_)('period.fields.month'),
      sortable: true,
    },
    {
      key: 'year',
      header: get(_)('period.fields.year'),
      sortable: true,
    },
    {
      key: 'created_at',
      header: get(_)('period.fields.createdAt'),
      format: (value) => formatDate(value as string),
      width: '160px',
    },
    {
      key: 'updated_at',
      header: get(_)('period.fields.updatedAt'),
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
          icon: row.closed ? Lock : LockOpen,
          color: row.closed ? 'var(--color-success)' : 'var(--color-warning)',
          onClick: async () => {
            if (row.closed) {
              toast.warning('Periodo já se encontra fechado')
              return
            }

            const confirmed = await confirmDialog({
              title: 'Fechar período?',
              description: 'Após o fechamento, não será possível alterar este período.',
              confirmLabel: 'Fechar período',
              cancelLabel: 'Cancelar',
              destructive: true,
            })

            if (!confirmed) return

            // Executa o fechamento do mês.
            // await closePeriod(row)
            periodClose()
              .then((response) => {
                if (response.id > row.id) {
                  toast.success('Período fechado com sucesso')
                  periodQuery.refetch()
                }
              })
              .catch((error) => {
                toast.error(`Erro ao fechar período: ${error.message}`)
              })
            // executa o fechamento do mês
          },
        },
      ],
    },
  ] satisfies TableColumn<Period>[]

  let filteredPeriod = $derived(
    (periodQuery.data ?? []).filter((item: Period) => item.month.toLowerCase().includes(search.toLowerCase())),
  )

  return {
    periodQuery,
    columns,
    get search() {
      return search
    },
    set search(value: string) {
      search = value
    },
    getFilteredPeriod() {
      return filteredPeriod
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
    set selected(value: Period | undefined) {
      selected = value
    },
  }
}

export { createPeriodController }
