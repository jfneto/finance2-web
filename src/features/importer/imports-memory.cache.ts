import type { Bank, Transaction } from '@lib/ofx'

const TRANSACTIONS_KEY = '@e-budget-ofx-transactions'
const BANK_KEY = '@e-budget-ofx-bank'

const hasLocalStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage
  } catch {
    return false
  }
}

const memoryStore: {
  transactions: Transaction[]
  bank: Bank
} = {
  transactions: [],
  bank: {},
}

const readJson = <T>(key: string, fallback: T): T => {
  if (!hasLocalStorage()) {
    return key === TRANSACTIONS_KEY ? (memoryStore.transactions as T) : (memoryStore.bank as T)
  }

  try {
    const raw = window.localStorage.getItem(key)

    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    window.localStorage.removeItem(key)
    return fallback
  }
}

const writeJson = <T>(key: string, value: T | null): void => {
  if (key === TRANSACTIONS_KEY) {
    memoryStore.transactions = (value as Transaction[] | null) ?? []
  } else {
    memoryStore.bank = (value as Bank | null) ?? {}
  }

  if (!hasLocalStorage()) return

  try {
    if (value === null) {
      window.localStorage.removeItem(key)
      return
    }

    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Mantém os dados disponíveis em memória.
  }
}

const getTransactions = (): Transaction[] => readJson<Transaction[]>(TRANSACTIONS_KEY, [])

const setTransactions = (transactions: Transaction[]): void => writeJson(TRANSACTIONS_KEY, transactions)

const clearTransactions = (): void => writeJson<Transaction[]>(TRANSACTIONS_KEY, null)

const getBank = (): Bank => readJson<Bank>(BANK_KEY, {})

const setBank = (bank: Bank): void => writeJson(BANK_KEY, bank)

const clear = (): void => {
  clearTransactions()
  writeJson<Bank>(BANK_KEY, null)
}

export const importsMemoryCache = {
  getTransactions,
  setTransactions,
  clearTransactions,
  getBank,
  setBank,
  clear,
}
