<script lang="ts">
  import BarChart from '@lib/components/ui/charts/BarChart.svelte'
  import WidgetCardValue from '@lib/components/ui/widgets/CardValue.svelte'
  import CardValueSummary from '@lib/components/ui/widgets/CardValueSummary.svelte'
  import { formatToCurrency } from '@lib/utils/numbers'
  import { CalendarChevronsRight, CreditCard, CreditCardMinus, CreditCardPlus } from '@lucide/svelte'
  import { _ } from 'svelte-i18n'
  import { createDashboardController } from './Dashboard.controller.svelte'

  const controller = createDashboardController()

  const getPercentage = (value: number | undefined): number => {
    if (!value) return 0

    return value * -1
  }
</script>

<main class="dashboard-page">
  <div class="dashboard-group-resume">
    <WidgetCardValue
      title={$_('dashboard.layout.widgets.credit')}
      actualValue={controller.widgetCreditQuery.data?.widget.current}
      percentage={getPercentage(controller.widgetCreditQuery.data?.widget.percentage)}
      previousLabel={`${$_('dashboard.layout.widgets.last_period')} ${formatToCurrency(controller.widgetCreditQuery.data?.widget.previous || '')}`}
    >
      {#snippet icon()}
        <CreditCardPlus size={48} color="var(--color-success)" />
      {/snippet}
    </WidgetCardValue>

    <WidgetCardValue
      title={$_('dashboard.layout.widgets.debits')}
      actualValue={controller.widgetDebitQuery.data?.widget.current}
      percentage={getPercentage(controller.widgetDebitQuery.data?.widget.percentage)}
      trendingColorUp="var(--color-danger)"
      trendingColorDown="var(--color-success)"
      previousLabel={`${$_('dashboard.layout.widgets.last_period')} ${formatToCurrency(controller.widgetDebitQuery.data?.widget.previous || '')}`}
    >
      {#snippet icon()}
        <CreditCardMinus size={48} color="var(--color-danger)" />
      {/snippet}
    </WidgetCardValue>

    <WidgetCardValue
      title={$_('dashboard.layout.widgets.creditcard')}
      actualValue={controller.widgetCreditcard.data?.widget.current}
      percentage={getPercentage(controller.widgetCreditcard.data?.widget.percentage)}
      trendingColorUp="var(--color-danger)"
      trendingColorDown="var(--color-success)"
      previousLabel={`${$_('dashboard.layout.widgets.last_period')} ${formatToCurrency(controller.widgetCreditcard.data?.widget.previous || '')}`}
    >
      {#snippet icon()}
        <CreditCard size={48} color="var(--color-danger)" />
      {/snippet}
    </WidgetCardValue>

    <CardValueSummary
      title={$_('dashboard.layout.widgets.future')}
      fixedCosts={controller.widgetPendingInstallments.data?.widget.fixed_costs}
      pendingInstallments={controller.widgetPendingInstallments.data?.widget.pending_installments}
      total={controller.widgetPendingInstallments.data?.widget.total}
    >
      {#snippet icon()}
        <CalendarChevronsRight size={48} color="var(--color-warning)" />
      {/snippet}
    </CardValueSummary>
  </div>
  <div>
    <BarChart data={controller.widgetBarChartSummarizedCreditsDebits.data} title={''} />
  </div>
</main>

<style>
  .dashboard-group-resume {
    display: flex;
    gap: 0.1rem;
  }
</style>
