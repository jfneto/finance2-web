import { api } from '@app/api'

const movimentDelete = async (id: string): Promise<string> => {
  const response = await api.delete(`/api/v1/moviments/${id}`)

  if (response.status === 200) return response.data.message as string
  if (response.status === 422) return response.data.error as string
  return ''
}

export { movimentDelete }
