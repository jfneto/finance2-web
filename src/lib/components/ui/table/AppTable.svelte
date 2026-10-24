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
    columns.map((column) => ({
      accessorKey: column.key,
      header: column.header,
    })) as ColumnDef<typeof features, TData>[],
  )

  const table = createTable({
    features,
    get columns() {
      return tableColumns
    },
    get data() {
      return data
    },
  })
</script>

<div class="table-container" style:border-radius={borderRadius}>
  <table>
    <colgroup>
      {#each columns as column (column.key)}
        <col style:width={column.width ?? 'auto'}>
      {/each}
    </colgroup>
    <thead>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <tr>
          {#each headerGroup.headers as header (header.id)}
            <th style:text-align={columns.find((item) => item.key === header.id)?.align ?? 'left'}>
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
              {@const column = columns.find((item) => item.key === cell.column.id)}
              {@const value = row.original[cell.column.id as keyof TData]}
              <td style:text-align={column?.align ?? 'left'}>
                {#if column?.booleanIcons && typeof value === 'boolean'}
                  {@const iconConfig = value ? column.booleanIcons.true : column.booleanIcons.false}
                  <iconConfig.component size={18} color={iconConfig.color} />
                {:else if column?.format}
                  {column.format(value, row.original)}
                {:else}
                  {String(value ?? '')}
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
</style>
