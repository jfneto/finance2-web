<script lang="ts">
  import AppCombo from '@lib/components/ui/inputs/AppCombo.svelte'
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import type { TableColumn } from '@lib/components/ui/table/types'
  import { ChevronDown, ChevronRight } from '@lucide/svelte'
  import { createCategoryReportController } from './CategoryReportPage.controller.svelte'
  import type { CategoryMovimentItem, CategoryNode } from './types'

  const controller = createCategoryReportController()

  const formatCurrency = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num || 0)
  }

  let expandedNodes = $state<Set<number>>(new Set())

  const toggleNode = (id: number) => {
    if (expandedNodes.has(id)) {
      expandedNodes.delete(id)
    } else {
      expandedNodes.add(id)
    }
    expandedNodes = new Set(expandedNodes)
  }

  const isExpanded = (id: number) => expandedNodes.has(id)

  const movimentColumns: TableColumn<CategoryMovimentItem>[] = [
    {
      key: 'description',
      header: 'Descrição',
      sortable: true,
    },
    {
      key: 'category',
      header: 'Categoria',
      sortable: true,
      width: '300px',
    },
    {
      key: 'parcel',
      header: 'Parcela',
      format: (_, row) => `${row.parcel}/${row.number_parcels}`,
      width: '80px',
      align: 'right',
    },
    {
      key: 'value',
      header: 'Valor',
      format: (value) => formatCurrency(value as string),
      cellColor: (_, row) => (row.cred_deb_type === 0 ? 'var(--color-success)' : 'var(--color-danger)'),
      width: '140px',
      align: 'right',
      sortable: true,
    },
    {
      key: 'pending_value',
      header: 'Pendente',
      format: (value) => (value ? formatCurrency(value as string | number) : '-'),
      cellColor: (_, row) => 'var(--color-warning)',
      width: '140px',
      align: 'right',
    },
  ]
</script>

{#snippet renderNode(node: CategoryNode, depth: number)}
  <div class="category-node" style:padding-left="{depth * 24}px">
    <button
      type="button"
      class="category-header"
      class:has-items={node.moviments.items.length > 0}
      onclick={() => toggleNode(node.id)}
    >
      <span class="expand-icon">
        {#if node.sub_category && node.sub_category.length > 0}
          {#if isExpanded(node.id)}
            <ChevronDown size={16} />
          {:else}
            <ChevronRight size={16} />
          {/if}
        {:else}
          <span class="spacer"></span>
        {/if}
      </span>
      <span class="category-name">{node.name}</span>
      {#if node.moviments.amount}
        <span class="category-amount">{formatCurrency(node.moviments.amount)}</span>
      {/if}
    </button>

    {#if isExpanded(node.id)}
      {#if node.moviments.items.length > 0}
        <div class="moviment-table-wrapper">
          <AppTable data={node.moviments.items} columns={movimentColumns} pageSize={50} />
        </div>
      {/if}

      {#if node.sub_category}
        {#each node.sub_category as child}
          {@render renderNode(child, depth + 1)}
        {/each}
      {/if}
    {/if}
  </div>
{/snippet}

<AppPaper title="Relatório por Categoria" padding="16px">
  {#snippet actions()}
    <div class="period-combo-wrapper">
      <AppCombo
        items={controller.periodsQuery.data ?? []}
        keyField="value"
        labelField="label"
        label="Período"
        bind:value={controller.selectedPeriodId}
      />
    </div>
  {/snippet}

  {#if controller.categoryQuery.isPending}
    <p>Carregando...</p>
  {:else if controller.categoryQuery.isError}
    <p>Erro ao carregar relatório.</p>
  {:else if !controller.categoryQuery.data || controller.categoryQuery.data.length === 0}
    <p>Nenhum dado encontrado.</p>
  {:else}
    <div class="report-tree">
      {#each controller.categoryQuery.data as node}
        {@render renderNode(node, 0)}
      {/each}
    </div>
  {/if}
</AppPaper>

<style>
  .period-combo-wrapper {
    width: 260px;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0 0 16px;
  }

  .report-tree {
    display: flex;
    flex-direction: column;
  }

  .category-node {
    border-left: 1px solid var(--color-border);
  }

  .category-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--color-text);
    gap: 8px;
    text-align: left;
    transition: background 0.15s;
  }

  .category-header:hover {
    background: var(--color-input);
  }

  .category-header.has-items {
    font-weight: 500;
  }

  .expand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    flex-shrink: 0;
    color: var(--color-text-muted);
  }

  .spacer {
    width: 16px;
  }

  .category-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .category-amount {
    flex-shrink: 0;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--color-text);
  }

  .moviment-table-wrapper {
    margin: 4px 0 8px 24px;
  }
</style>
