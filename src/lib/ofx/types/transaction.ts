interface Transaction {
  type?: string
  dtPosted?: string
  amount?: number
  credit?: boolean
  fitId?: string
  checkNum?: string
  refNum?: string
  memo?: string
}

export type { Transaction }
