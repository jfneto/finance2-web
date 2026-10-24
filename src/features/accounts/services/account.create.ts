import { api } from '@app/api'
import type { Account } from '@features/accounts/account'

const createAccount = async (payload: Account): Promise<Account> => {
  const response = await api.post('/api/v1/accounts', payload)

  return response.data as Account
}

export { createAccount }
