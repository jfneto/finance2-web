import type { Transaction } from './transaction'

interface BankMessage {
  transactions?: Transaction[]
  creditCardTransactions?: Transaction[]
}

export type { BankMessage }
