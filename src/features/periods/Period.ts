interface Period {
  id: number
  closed: boolean
  month: string
  year: number
  created_at?: string
  updated_at?: string
  error?: string
}

type PeriodPayload = Omit<Period, 'id'>

export type { Period, PeriodPayload }
