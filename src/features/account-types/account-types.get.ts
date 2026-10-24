import { api } from '@app/api'
import type { AccountType } from './account-type'

const getAccountTypes = async (): Promise<AccountType[]> => {
  const { data } = await api.get<AccountType[]>('/api/v1/accounttypes')

  return data
}

export { getAccountTypes }
