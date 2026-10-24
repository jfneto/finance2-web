import { api } from '@app/api'
import type { Account } from '@features/accounts/account'

const updateAccount = async (payload: Account): Promise<Account> => {
  const response = await api.patch(`/api/v1/accounts/${payload.id}`, payload)

  return response.data as Account
}

export { updateAccount }
