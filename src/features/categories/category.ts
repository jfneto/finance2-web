interface Owner {
  id?: number
  description: string
}

interface Category {
  id: number
  description: string
  category?: Owner
  category_type: string
  level: string
  level_number: number
  active: boolean
  show_in_dashboard: boolean
  show_in_line_graph: boolean
  created_at?: string
  updated_at?: string
}

interface CategoryPayload {
  id?: number
  category_id: number
  category_type: string
  description: string
  active: boolean
  show_in_dashboard: boolean
  show_in_line_graph: boolean
}

export type { Category, CategoryPayload }
