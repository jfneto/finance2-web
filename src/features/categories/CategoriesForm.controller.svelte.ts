import { StringOrDefault, StringOrEmpty, StringOrUndefined } from '@lib/utils/string'
import { createQuery } from '@tanstack/svelte-query'
import { toast } from 'svelte-sonner'
import { categoriesQueryOptions } from './categories.query'
import type { Category, CategoryPayload } from './category'
import { categoryCreate, categoryUpdate } from './services'

const createCategoryFormController = (onSubmitted?: () => void) => {
  const categoriesQuery = createQuery(() => ({
    ...categoriesQueryOptions(),
  }))

  let id = $state<number | undefined>(undefined)
  let active = $state<boolean>(false)

  let categoryId = $state<string | undefined>(undefined)
  let categoryType = $state<string>('')
  let description = $state<string>('')
  let showInDashboard = $state<boolean>(false)
  let showInLineGraph = $state<boolean>(false)
  let levelNumber = $state<number>(0)

  const initState = (category?: Category) => {
    id = category?.id ?? undefined
    active = category?.active ?? false
    description = StringOrEmpty(category?.description)
    categoryId = StringOrUndefined(category?.category?.id)
    categoryType = StringOrDefault(category?.category_type, '0')
    showInDashboard = category?.show_in_dashboard ?? false
    showInLineGraph = category?.show_in_line_graph ?? false
    levelNumber = category?.level_number ?? 0
  }

  const handleOnSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // seguir daqui e montar o payload tipado e carregar o evento de envio para o backend
    const payload: CategoryPayload = {
      id: Number(id) ?? undefined,
      active: active,
      description: description,
      category_id: Number(categoryId) ?? undefined,
      category_type: categoryType ?? '',
      show_in_dashboard: showInDashboard,
      show_in_line_graph: showInLineGraph,
    }

    onSubmitted?.()

    if (id === undefined) {
      categoryCreate(payload)
        .then(() => {
          toast.success('Categoria criada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possivel criar a categoria')
        })
    } else {
      categoryUpdate(payload)
        .then(() => {
          toast.success('Categoria atualizada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possível atualizar a categoria')
        })
    }
  }

  const categoryTypeOptions = [
    { id: 'CREDIT', label: 'Crédito' },
    { id: 'DEBIT', label: 'Debito' },
  ]

  let filteredCategories = $derived(() => {
    const categories = categoriesQuery.data ?? []
    return categories.filter((category) => category.level_number < levelNumber)
  })

  return {
    initState,
    categoriesQuery,
    filteredCategories,
    handleOnSubmit,
    categoryTypeOptions,

    get id() {
      return id
    },
    set id(value) {
      id = value
    },
    get active() {
      return active
    },
    set active(value) {
      active = value
    },
    get description() {
      return description
    },
    set description(value) {
      description = value
    },
    get categoryId() {
      return categoryId
    },
    set categoryId(value) {
      categoryId = value
    },
    get categoryType() {
      return categoryType
    },
    set categoryType(value) {
      categoryType = value
    },
    get showInDashboard() {
      return showInDashboard
    },
    set showInDashboard(value) {
      showInDashboard = value
    },
    get showInLineGraph() {
      return showInLineGraph
    },
    set showInLineGraph(value) {
      showInLineGraph = value
    },

    get levelNumber() {
      return levelNumber
    },
    set levelNumber(value) {
      levelNumber = value
    },
  }
}

export { createCategoryFormController }
