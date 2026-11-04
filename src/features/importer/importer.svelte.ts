import { toast } from 'svelte-sonner'
import { importsMemoryCache } from './imports-memory.cache'

const state = $state({
  transactions: importsMemoryCache.getTransactions(),
  bank: importsMemoryCache.getBank(),
})

const setTransactions = (transactions: typeof state.transactions): void => {
  state.transactions = transactions
  importsMemoryCache.setTransactions(transactions)
}

const removeTransaction = (fitId: string | number): void => {
  const transactions = state.transactions.filter((transaction) => transaction.fitId !== fitId)

  state.transactions = transactions
  importsMemoryCache.setTransactions(transactions)

  toast.success('Transação removida com sucesso!')
}

const setBank = (bank: typeof state.bank): void => {
  state.bank = bank
  importsMemoryCache.setBank(bank)
}

const clear = (): void => {
  state.transactions = []
  state.bank = {}

  importsMemoryCache.clear()
}

export const importerStore = {
  state,
  setTransactions,
  removeTransaction,
  setBank,
  clear,
}
