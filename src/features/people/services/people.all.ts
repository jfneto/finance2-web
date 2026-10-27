import { api } from '@app/api'
import type { Person } from '@features/people'

const peopleAll = async (): Promise<Person[]> => {
  const response = await api.get('/api/v1/people')

  return response.data.people as Person[]
}

export { peopleAll }
