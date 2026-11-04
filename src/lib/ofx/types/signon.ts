import type { FinancialInstitution } from './financial-institution'
import type { Status } from './status'

interface Signon {
  status: Status
  dtServer: string // 20230701120000[-3:BRT]
  language: string
  financialInstitution: FinancialInstitution
}

export type { Signon }
