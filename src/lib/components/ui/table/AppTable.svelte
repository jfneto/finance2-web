<script lang="ts" generics="TData extends object">
  import type { ColumnDef } from '@tanstack/svelte-table'
  import { createTable, FlexRender, tableFeatures } from '@tanstack/svelte-table'
  import type { TableColumn } from './types'

  interface Props {
    data: TData[]
    columns: TableColumn<TData>[]
    emptyMessage?: string
    borderRadius?: string
    pageSize?: number
  }

  let {
    data,
    columns,
    emptyMessage = 'Nenhum registro encontrado.',
    borderRadius = 'var(--radius-sm, 4px)',
    pageSize = 15,
  }: Props = $props()

  let pageIndex = $state(0)

  const pageCount = $derived(Math.ceil(data.length / pageSize))
  // const paginatedData = $derived(data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))
  // let paginatedData = $derived.by(() => data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))
  type SortDirection = 'asc' | 'desc'

  interface SortState {
    key: string
    direction: SortDirection
  }

  let sortState = $state<SortState | null>(null)

  const sortedData = $derived.by(() => {
    if (!sortState) return data

    const column = columns.find((column) => column.type !== 'actions' && String(column.key) === sortState.key)

    if (!column || column.sortable !== true) return data

    const { key, direction } = sortState
    const multiplier = direction === 'asc' ? 1 : -1

    return [...data].sort((a, b) => {
      const aValue = getValue(a, key)
      const bValue = getValue(b, key)

      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      let result: number

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        result = Number(aValue) - Number(bValue)
      } else if (aValue instanceof Date && bValue instanceof Date) {
        result = aValue.getTime() - bValue.getTime()
      } else {
        result = String(aValue).localeCompare(String(bValue), undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      }

      return result * multiplier
    })
  })

  const paginatedData = $derived(sortedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))

  const toggleSort = (key: string) => {
    if (sortState?.key !== key) {
      sortState = { key, direction: 'asc' }
    } else if (sortState.direction === 'asc') {
      sortState = { key, direction: 'desc' }
    } else {
      sortState = null
    }

    pageIndex = 0
  }

  const getValue = (object: unknown, path: string): unknown =>
    path.split('.').reduce<unknown>((value, key) => {
      if (value === null || typeof value !== 'object') return undefined
      return (value as Record<string, unknown>)[key]
    }, object)

  const features = tableFeatures({})

  const tableColumns = $derived(
    columns.map((column) => {
      if (column.type === 'actions') {
        return {
          id: 'actions',
          header: column.header,
          cell: () => null,
        }
      }

      return {
        id: String(column.key),
        accessorFn: (row: TData) => getValue(row, String(column.key)),
        header: column.header,
      }
    }) as ColumnDef<typeof features, TData>[],
  )

  const table = $derived(
    createTable({
      features,
      get columns() {
        return tableColumns
      },
      get data() {
        return paginatedData
      },
    }),
  )

  const columnForHeader = (id: string) =>
    columns.find((column) => (column.type === 'actions' ? id === 'actions' : String(column.key) === id))

  const firstItem = $derived(data.length === 0 ? 0 : pageIndex * pageSize + 1)
  const lastItem = $derived(Math.min((pageIndex + 1) * pageSize, data.length))

  const goToPage = (index: number) => {
    pageIndex = Math.max(0, Math.min(index, pageCount - 1))
  }

  $effect(() => {
    // Volta para a última página válida quando a quantidade de dados diminui.
    if (pageIndex >= pageCount && pageCount > 0) {
      pageIndex = pageCount - 1
    } else if (pageCount === 0 && pageIndex !== 0) {
      pageIndex = 0
    }
  })
</script>

<div class="table-container" style:border-radius={borderRadius}>
  <!-- <p>Registros: {data.length} | Nesta página: {paginatedData.length} | Página: {pageIndex + 1}</p> -->
  <table>
    <colgroup>
      {#each columns as column (column.type === 'actions' ? 'actions' : String(column.key))}
        <col style:width={column.width ?? 'auto'}>
      {/each}
    </colgroup>

    <thead>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <tr>
          {#each headerGroup.headers as header (header.id)}
            <th style:text-align={columnForHeader(header.id)?.align ?? 'left'}>
              {#if !header.isPlaceholder}
                {@const column = columnForHeader(header.id)}

                {#if column && column.type !== 'actions' && column.sortable}
                  <button
                    type="button"
                    class="sort-button"
                    onclick={() => toggleSort(String(column.key))}
                    aria-label={`Ordenar por ${column.header}`}
                  >
                    <FlexRender {header} />
                    <span class="sort-indicator" aria-hidden="true">
                      {sortState?.key === String(column.key) ? (sortState.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </button>
                {:else}
                  <FlexRender {header} />
                {/if}
              {/if}
            </th>
            <!-- <th style:text-align={columnForHeader(header.id)?.align ?? 'left'}>
              {#if !header.isPlaceholder}
                <FlexRender {header} />
              {/if}
            </th> -->
          {/each}
        </tr>
      {/each}
    </thead>

    <tbody>
      {#if data.length === 0}
        <tr>
          <td class="empty" colspan={columns.length}>
            {emptyMessage}
          </td>
        </tr>
      {:else}
        {#each paginatedData as item, index (index)}
          <tr>
            {#each columns as column, columnIndex (column.type === 'actions' ? 'actions' : String(column.key))}
              <td style:text-align={column.align ?? 'left'}>
                {#if column.type === 'actions'}
                  <div class="table-actions">
                    {#each column.actions(item) as action (action.label)}
                      <button
                        type="button"
                        title={action.label}
                        aria-label={action.label}
                        class="table-action"
                        style:color={action.color ?? 'inherit'}
                        onclick={() => action.onClick(item)}
                      >
                        <action.icon size={18} />
                      </button>
                    {/each}
                  </div>
                {:else}
                  {@const value = getValue(item, String(column.key))}

                  {#if column.booleanIcons && typeof value === 'boolean'}
                    {@const iconConfig = value ? column.booleanIcons.true : column.booleanIcons.false}
                    <iconConfig.component size={18} color={iconConfig.color} />
                  {:else if column.format}
                    {column.format(value, item)}
                  {:else}
                    {String(value ?? '')}
                  {/if}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

{#if data.length > pageSize}
  <div class="pagination">
    <span class="pagination-info"> Exibindo {firstItem}–{lastItem} de {data.length} registros </span>

    <div class="pagination-controls">
      <button
        type="button"
        disabled={pageIndex === 0}
        onclick={() => goToPage(pageIndex - 1)}
        aria-label="Página anterior"
      >
        Anterior
      </button>

      <span class="page-indicator"> Página {pageIndex + 1} de {pageCount} </span>

      <button
        type="button"
        disabled={pageIndex >= pageCount - 1}
        onclick={() => goToPage(pageIndex + 1)}
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </div>
  </div>
{/if}

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--color-border);
    box-sizing: border-box;
    height: auto;
  }
  /*.table-container {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--color-border);
  }*/

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
  }

  .sort-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: inherit;
    text-align: inherit;
    cursor: pointer;
  }

  .sort-indicator {
    opacity: 0.65;
  }

  th,
  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    white-space: nowrap;
  }

  th {
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-weight: 600;
  }

  td {
    color: var(--color-text);
  }

  /*tbody tr:last-child td {
    border-bottom: 0;
  }*/

  tbody tr:hover {
    background: var(--color-input);
  }

  .empty {
    padding: 32px 16px;
    color: var(--color-text-muted);
    text-align: center;
  }

  .table-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .table-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .table-action:hover {
    opacity: 0.7;
  }

  .table-action:focus-visible,
  .pagination button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 0;
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pagination button {
    padding: 6px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
  }

  .pagination button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .page-indicator {
    white-space: nowrap;
  }
</style>
