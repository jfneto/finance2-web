import { createQuery } from '@tanstack/svelte-query'
import { extractByPeriodQueryOptions } from './reports.query'

const createExtractPageController = () => {
 const extractQuery = createQuery(() => ({
 ...extractByPeriodQueryOptions(),
 }))

 let activePeriod = $state<string>('')

 $effect(() => {
 if (!activePeriod && extractQuery.data && extractQuery.data.length > 0) {
 activePeriod = extractQuery.data[0].period
 }
 })

 const periods = $derived(extractQuery.data?.map((item) => item.period) ?? [])

 const activeMoviments = $derived.by(() => {
 if (!extractQuery.data || !activePeriod) return null
 return extractQuery.data.find((item) => item.period === activePeriod)?.moviments ?? null
 })

 return {
 extractQuery,
 periods,
 activeMoviments,
 get activePeriod() {
 return activePeriod
 },
 set activePeriod(value: string) {
 activePeriod = value
 },
 }
}

export { createExtractPageController }