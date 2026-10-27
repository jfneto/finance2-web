import { api } from '@app/api'
import type { Person } from '@features/people'

const personUpdate = async (payload: Partial<Person>): Promise<Person> => {
  const response = await api.patch(`/api/v1/people/${payload.id}`, payload)
  return response.data as Person
}

export { personUpdate }
