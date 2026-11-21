<script lang="ts">
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import { ChevronDown, ChevronRight } from '@lucide/svelte'
  import { createCategoryReportController } from './CategoryReportPage.controller.svelte'
  import type { CategoryNode } from './types'

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
        <table class="moviment-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Parcela</th>
              <th>Valor</th>
              <th>Pendente</th>
            </tr>
          </thead>
          <tbody>
            {#each node.moviments.items as mov}
              <tr class:credit={mov.cred_deb_type === 0} class:debit={mov.cred_deb_type === 1}>
                <td>{mov.description}</td>
                <td>{mov.category}</td>
                <td>{mov.parcel}/{mov.number_parcels}</td>
                <td>{formatCurrency(mov.value)}</td>
                <td>{mov.pending_value ? formatCurrency(mov.pending_value) : '-'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
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

  .moviment-table {
    width: calc(100% - 24px);
    margin: 4px 0 8px 24px;
    border-collapse: collapse;
    font-size: 0.8rem;
  }

  .moviment-table th,
  .moviment-table td {
    padding: 6px 10px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  .moviment-table th {
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .moviment-table tbody tr:hover {
    background: var(--color-input);
  }

  .moviment-table tr.credit td:nth-child(4) {
    color: var(--color-success);
  }

  .moviment-table tr.debit td:nth-child(4) {
    color: var(--color-danger);
  }
</style>
