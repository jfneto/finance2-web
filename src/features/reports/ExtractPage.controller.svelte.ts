import type { TableColumn } from '@lib/components/ui/table/types'
import { BanknoteArrowDown, BanknoteArrowUp } from '@lucide/svelte'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import { extractByPeriodQueryOptions } from './reports.query'
import type { ExtractMoviment } from './types'

type ViewTab = 'extract' | 'creditcard'

const createExtractPageController = () => {
  const extractQuery = createQuery(() => ({
    ...extractByPeriodQueryOptions(),
  }))

  const ui = $state({
    activeView: 'extract' as ViewTab,
    selectedPeriod: null as string | null,
  })

  const sortedPeriods = $derived.by(() => {
    const data = extractQuery.data
    if (!data) return []
    return [...data]
      .sort((a, b) => {
        const [monthA, yearA] = a.period.split('/').map(Number)
        const [monthB, yearB] = b.period.split('/').map(Number)
        return yearB * 100 + monthB - (yearA * 100 + monthA)
      })
      .map((item) => item.period)
  })

  const activeMoviments = $derived.by(() => {
    const data = extractQuery.data
    const period = ui.selectedPeriod ?? sortedPeriods[0]
    const view = ui.activeView

    if (!data || !period) return null
    const periodData = data.find((item) => item.period === period)

    if (!periodData) return null
    return view === 'extract' ? periodData.moviments.extract : periodData.moviments.creditcard
  })

  const formatCurrency = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num || 0)
  }

  const columns: TableColumn<ExtractMoviment>[] = [
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
      key: 'description',
      header: get(_)('moviment.fields.description'),
      sortable: true,
    },
    {
      key: 'category',
      header: get(_)('moviment.fields.categoryId'),
      sortable: true,
    },
    {
      key: 'value',
      header: get(_)('moviment.fields.value'),
      align: 'right',
      format: (value) => formatCurrency(value as string),
      width: '160px',
      sortable: true,
    },
  ]

  return {
    extractQuery,
    columns,
    get sortedPeriods() {
      return sortedPeriods
    },
    get activeMoviments() {
      return activeMoviments
    },
    get activeView() {
      return ui.activeView
    },
    set activeView(value: ViewTab) {
      ui.activeView = value
    },
    get activePeriod() {
      return ui.selectedPeriod ?? sortedPeriods[0] ?? ''
    },
    set activePeriod(value: string) {
      ui.selectedPeriod = value
    },
  }
}

export type { ViewTab }
export { createExtractPageController }
