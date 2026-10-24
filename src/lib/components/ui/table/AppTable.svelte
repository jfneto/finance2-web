<script lang="ts" generics="TData extends object">
  import type { ColumnDef } from '@tanstack/svelte-table'
  import { createTable, FlexRender, tableFeatures } from '@tanstack/svelte-table'
  import type { TableColumn } from './types'

  interface Props {
    data: TData[]
    columns: TableColumn<TData>[]
    emptyMessage?: string
    borderRadius?: string
  }

  let {
    data,
    columns,
    emptyMessage = 'Nenhum registro encontrado.',
    borderRadius = 'var(--radius-sm, 4px)',
  }: Props = $props()

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
        accessorKey: column.key,
        header: column.header,
      }
    }) as ColumnDef<typeof features, TData>[],
  )
  // const tableColumns = $derived(
  //   columns.map((column) => ({
  //     accessorKey: column.key,
  //     header: column.header,
  //   })) as ColumnDef<typeof features, TData>[],
  // )

  const table = createTable({
    features,
    get columns() {
      return tableColumns
    },
    get data() {
      return data
    },
  })

  const columnForHeader = (id: string) =>
    columns.find((column) => (column.type === 'actions' ? id === 'actions' : column.key === id))
</script>

<div class="table-container" style:border-radius={borderRadius}>
  <table>
    <colgroup>
      <!-- colgroup -->
      {#each columns as column (column.type === 'actions' ? 'actions' : column.key)}
        <col style:width={column.width ?? 'auto'}>
      {/each}
    </colgroup>
    <thead>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <tr>
          {#each headerGroup.headers as header (header.id)}
            <th style:text-align={columnForHeader(header.id)?.align ?? 'left'}>
              {#if !header.isPlaceholder}
                <FlexRender {header} />
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>

    <tbody>
      {#if table.getRowModel().rows.length === 0}
        <tr>
          <td class="empty" colspan={columns.length}>
            {emptyMessage}
          </td>
        </tr>
      {:else}
        {#each table.getRowModel().rows as row (row.id)}
          <tr>
            {#each row.getAllCells() as cell (cell.id)}
              {@const column = columns.find((item) =>
                item.type === 'actions' ? cell.column.id === 'actions' : item.key === cell.column.id,
              )}

              <td style:text-align={column?.align ?? 'left'}>
                {#if column?.type === 'actions'}
                  <div class="table-actions">
                    {#each column.actions(row.original) as action (action.label)}
                      <button
                        type="button"
                        title={action.label}
                        aria-label={action.label}
                        class="table-action"
                        style:color={action.color ?? 'inherit'}
                        onclick={() => action.onClick(row.original)}
                      >
                        <action.icon size={18} />
                      </button>
                    {/each}
                  </div>
                {:else if column}
                  {@const value = row.original[column.key]}

                  {#if column.booleanIcons && typeof value === 'boolean'}
                    {@const iconConfig = value ? column.booleanIcons.true : column.booleanIcons.false}
                    <iconConfig.component size={18} color={iconConfig.color} />
                  {:else if column.format}
                    {column.format(value, row.original)}
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

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--color-border);
    /*border-radius: var(--radius-sm, 4px);*/
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
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

  tbody tr:last-child td {
    border-bottom: 0;
  }

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

  .table-action:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
</style>
