import { api } from '@app/api'
import type { ExtractPeriod } from '../types'

const extractByPeriod = async (): Promise<ExtractPeriod[]> => {
 const response = await api.get('/api/v1/extract/moviments/by/period')
 return response.data as ExtractPeriod[]
}

export { extractByPeriod }