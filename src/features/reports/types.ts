interface ExtractMoviment {
  id: number
  cred_deb_type: number
  description: string
  category: string
  value: string
  is_cc: boolean
  parcel: number
  number_parcels: number
  pending_value: string | number
}

interface ExtractPeriod {
  period: string
  moviments: {
    creditcard: ExtractMoviment[]
    extract: ExtractMoviment[]
  }
}

interface CategoryMovimentItem {
  id: number
  cred_deb_type: number
  description: string
  category: string
  value: string
  is_cc: boolean
  parcel: number
  number_parcels: number
  pending_value: string | number
}

interface CategoryMoviments {
  amount: string | null
  items: CategoryMovimentItem[]
}

interface CategoryNode {
  id: number
  name: string
  moviments: CategoryMoviments
  sub_category?: CategoryNode[]
}

export type { CategoryMovimentItem, CategoryMoviments, CategoryNode, ExtractMoviment, ExtractPeriod }
