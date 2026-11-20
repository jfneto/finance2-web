<script lang="ts">
  import AppContainer from '@lib/components/ui/layout/AppContainer.svelte'
  import { Tabs } from 'bits-ui'
  import { createExtractPageController } from './ExtractPage.controller.svelte'

  const controller = createExtractPageController()

  const formatCurrency = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num || 0)
  }
</script>

<AppContainer gap="16px">
  <h1>Extrato Mensal</h1>

  {#if controller.extractQuery.isPending}
    <p>Carregando...</p>
  {:else if controller.extractQuery.isError}
    <p>Erro ao carregar extrato.</p>
  {:else if controller.periods.length === 0}
    <p>Nenhum período encontrado.</p>
  {:else}
    <Tabs.Root bind:value={controller.activePeriod}>
      <Tabs.List class="tabs-list">
        {#each controller.periods as period}
          <Tabs.Trigger value={period} class="tab-trigger">
            {period}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>

      {#each controller.periods as period}
        <Tabs.Content value={period} class="tab-content">
          {#if controller.activeMoviments}
            <div class="moviment-section">
              <h2>Cartão de Crédito ({controller.activeMoviments.creditcard.length})</h2>
              {#if controller.activeMoviments.creditcard.length > 0}
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
                    {#each controller.activeMoviments.creditcard as mov}
                      <tr>
                        <td>{mov.description}</td>
                        <td>{mov.category}</td>
                        <td>{mov.parcel}/{mov.number_parcels}</td>
                        <td>{formatCurrency(mov.value)}</td>
                        <td>{mov.pending_value ? formatCurrency(mov.pending_value) : '-'}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              {:else}
                <p class="empty">Nenhuma movimentação no cartão neste período.</p>
              {/if}
            </div>

            <div class="moviment-section">
              <h2>Extrato Conta ({controller.activeMoviments.extract.length})</h2>
              {#if controller.activeMoviments.extract.length > 0}
                <table class="moviment-table">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each controller.activeMoviments.extract as mov}
                      <tr class:credit={mov.cred_deb_type === 0} class:debit={mov.cred_deb_type === 1}>
                        <td>{mov.description}</td>
                        <td>{mov.category}</td>
                        <td>{formatCurrency(mov.value)}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              {:else}
                <p class="empty">Nenhuma movimentação em conta neste período.</p>
              {/if}
            </div>
          {/if}
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  {/if}
</AppContainer>

<style>
  h1 {
    font-size: 1.5rem;
    margin: 0 0 16px;
  }

  h2 {
    font-size: 1.1rem;
    margin: 24px 0 8px;
    color: var(--color-text);
  }

  .tabs-list {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--color-border);
    overflow-x: auto;
    padding-bottom: 0;
  }

  .tab-trigger {
    padding: 8px 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: color 0.2s, border-color 0.2s;
  }

  .tab-trigger:hover {
    color: var(--color-text);
  }

  .tab-trigger[data-state='active'] {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    font-weight: 600;
  }

  .tab-content {
    padding: 16px 0;
  }

  .moviment-section {
    margin-bottom: 32px;
  }

  .moviment-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .moviment-table th,
  .moviment-table td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  .moviment-table th {
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  .moviment-table tbody tr:hover {
    background: var(--color-input);
  }

  .moviment-table tr.credit td:last-child {
    color: var(--color-success);
  }

  .moviment-table tr.debit td:last-child {
    color: var(--color-danger);
  }

  .empty {
    color: var(--color-text-muted);
    font-style: italic;
    padding: 16px 0;
  }
</style>