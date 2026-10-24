import { api } from '@app/api'
import type { Account } from '@features/accounts/account'

const getAccounts = async (): Promise<Account[]> => {
  const response = await api.get('/api/v1/accounts')

  return response.data as Account[]
}

export { getAccounts }
