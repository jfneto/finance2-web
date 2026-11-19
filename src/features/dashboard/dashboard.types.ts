interface DashboardWidget {
  widget: {
    current: string
    previous: string
    percentage: number
  }
}

interface DashboardPendingWidget {
  widget: {
    pending_installments: string
    fixed_costs: string
    total: string
  }
}

interface DashboardCategory {
  period_id: number
  level: string
  description: string
  category_type: string
  value: string
}

interface GroupedDataToLineGraphResultset {
  labels: string[]
  datasets: {
    label: string
    data: string[]
    borderColor: string
    backgroundColor: string
  }
}

interface GroupedDataToLineGraph {
  result_set: GroupedDataToLineGraphResultset[]
}

export type {
  DashboardCategory,
  DashboardPendingWidget,
  DashboardWidget,
  GroupedDataToLineGraph,
  GroupedDataToLineGraphResultset,
}
