import { createQuery } from '@tanstack/svelte-query'
import { extractByPeriodQueryOptions } from './reports.query'

type ViewTab = 'extract' | 'creditcard'

const createExtractPageController = () => {
  const extractQuery = createQuery(() => ({
    ...extractByPeriodQueryOptions(),
  }))

  let activeView = $state<ViewTab>('extract')
  let selectedPeriod = $state<string | null>(null)

  const sortedPeriods = $derived.by(() => {
    if (!extractQuery.data) return []
    return [...extractQuery.data]
      .sort((a, b) => {
        const [monthA, yearA] = a.period.split('/').map(Number)
        const [monthB, yearB] = b.period.split('/').map(Number)
        return yearB * 100 + monthB - (yearA * 100 + monthA)
      })
      .map((item) => item.period)
  })

  const activePeriod = $derived(selectedPeriod ?? sortedPeriods[0] ?? '')

  const activeMoviments = $derived.by(() => {
    const data = extractQuery.data
    const period = selectedPeriod ?? sortedPeriods[0] ?? ''
    const view = activeView

    if (!data || !period) return null
    const periodData = data.find((item) => item.period === period)

    if (!periodData) return null
    return view === 'extract' ? periodData.moviments.extract : periodData.moviments.creditcard
  })

  return {
    extractQuery,
    sortedPeriods,
    get activeMoviments() {
      return activeMoviments
    },
    get activeView() {
      return activeView
    },
    set activeView(value: ViewTab) {
      activeView = value
    },
    get activePeriod() {
      return activePeriod
    },
    set activePeriod(value: string) {
      selectedPeriod = value
    },
  }
}

export type { ViewTab }
export { createExtractPageController }
