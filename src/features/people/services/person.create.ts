import { api } from '@app/api'
import type { Person } from '@features/people'

const personCreate = async (payload: Partial<Person>): Promise<Person> => {
  const response = await api.post('/api/v1/people', payload)
  return response.data as Person
}

export { personCreate }
