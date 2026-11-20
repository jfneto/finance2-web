<script lang="ts">
  import { currencyFormat } from '@lib/utils/numbers'
  import { DollarSign } from '@lucide/svelte'
  import type { Snippet } from 'svelte'

  type Color = 'success' | 'error' | 'warning' | 'info'

  interface Props {
    title?: string
    fixedCosts?: string | number
    pendingInstallments?: string | number
    total?: string | number
    iconColor?: Color
    icon?: Snippet
  }

  const colors: Record<Color, string> = {
    success: 'var(--color-success)',
    error: 'var(--color-danger)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
  }

  let {
    title,
    fixedCosts,
    pendingInstallments,
    total,
    iconColor = 'info',
    icon,
  }: Props = $props()
</script>

<div class="card">
  <div class="header">
    <div class="title-wrapper">
      <div class="title">{title}</div>
    </div>

    <div class="icon">
      {#if icon}
        {@render icon()}
      {:else}
        <DollarSign size={48} color={colors[iconColor]} />
      {/if}
    </div>
  </div>

  <div class="lines">
    <div class="line">
      <span class="label">Recorrente</span>
      <span class="value">{currencyFormat(Number(fixedCosts ?? 0))}</span>
    </div>
    <div class="line">
      <span class="label">Futuro</span>
      <span class="value">{currencyFormat(Number(pendingInstallments ?? 0))}</span>
    </div>
    <div class="line total">
      <span class="label">Total</span>
      <span class="value">{currencyFormat(Number(total ?? 0))}</span>
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: left;
    min-width: 250px;
    min-height: 120px;
    width: 300px;
    margin: 10px;
    padding: 10px;
    color: #000;
    background-color: #dbd9e8;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }

  .title-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 10px;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 0.95em;
    color: rgb(116, 118, 126);
    text-transform: uppercase;
  }

  .icon {
    display: flex;
    margin-top: 15px;
  }

  .lines {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 12px;
  }

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  .line.total {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 6px;
    margin-top: 2px;
    font-weight: 600;
  }

  .label {
    color: rgb(116, 118, 126);
  }

  .value {
    font-weight: 400;
  }
</style>