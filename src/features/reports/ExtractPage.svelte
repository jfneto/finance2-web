<script lang="ts">
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { createExtractPageController } from './ExtractPage.controller.svelte'

  const controller = createExtractPageController()
</script>

<AppPaper title="Extrato Mensal" padding="16px">
  {#if controller.extractQuery.isPending}
    <p>Carregando...</p>
  {:else if controller.extractQuery.isError}
    <p>Erro ao carregar extrato.</p>
  {:else if controller.sortedPeriods.length === 0}
    <p>Nenhum período encontrado.</p>
  {:else}
    <div class="view-buttons">
      <button
        type="button"
        class="view-button"
        class:active={controller.activeView === 'extract'}
        onclick={() => (controller.activeView = 'extract')}
      >
        Extratos Bancários por Mês
      </button>
      <button
        type="button"
        class="view-button"
        class:active={controller.activeView === 'creditcard'}
        onclick={() => (controller.activeView = 'creditcard')}
      >
        Fatura Cartão de Crédito por Mês
      </button>
    </div>

    <div class="period-buttons">
      {#each controller.sortedPeriods as period}
        <button
          type="button"
          class="period-button"
          class:active={controller.activePeriod === period}
          onclick={() => (controller.activePeriod = period)}
        >
          {period}
        </button>
      {/each}
    </div>

    <AppTable
      data={controller.activeMoviments ?? []}
      columns={controller.columns}
      emptyMessage="Nenhuma movimentação neste período."
      pageSize={13}
    />
  {/if}
</AppPaper>

<style>
  .view-buttons {
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }

  .view-button {
    flex: 1;
    padding: 12px 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    text-align: center;
    transition: color 0.2s;
  }

  .view-button:hover {
    color: var(--color-text);
  }

  .view-button.active {
    color: var(--color-primary);
    font-weight: 600;
    border-bottom: 2px solid var(--color-primary);
    margin-bottom: -1px;
  }

  .period-buttons {
    display: flex;
    width: 100%;
    margin-bottom: 16px;
  }

  .period-button {
    flex: 1;
    padding: 8px 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    text-align: center;
    transition: all 0.15s;
  }

  .period-button:hover {
    background: var(--color-input);
    color: var(--color-text);
  }

  .period-button.active {
    background: var(--color-primary);
    color: #fff;
    font-weight: 600;
  }
</style>
