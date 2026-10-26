interface Account {
  id: number
  account_type_id: number
  account_type_desc?: string
  name: string
  balance: number
  active: boolean
  created_at?: string
  updated_at?: string
  bank_account_number?: string
  bank_branch_id?: string
  credit_card_number?: string
}

interface AccountSimple {
  id: number
  name: string
}

export type { Account, AccountSimple }
