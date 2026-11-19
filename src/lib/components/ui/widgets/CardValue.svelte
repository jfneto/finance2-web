<script lang="ts">
  import { currencyFormat } from '@lib/utils/numbers'
  import { DollarSign, TrendingDown, TrendingUp } from '@lucide/svelte'
  import type { Component, Snippet } from 'svelte'

  type Color = 'success' | 'error' | 'warning' | 'info'

  interface Props {
    title?: string
    actualValue?: string | number
    percentage?: number
    iconColor?: Color
    icon?: Snippet
    previousLabel?: string
    trendingColorUp?: string
    trendingColorDown?: string
  }

  const colors: Record<Color, string> = {
    success: 'var(--color-success)',
    error: 'var(--color-danger)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
  }

  let {
    title,
    actualValue,
    percentage,
    iconColor = 'info',
    icon,
    previousLabel = 'Mês anterior',
    trendingColorUp = colors.success,
    trendingColorDown = colors.warning,
  }: Props = $props()

  const trend = $derived.by(() => {
    if (percentage === undefined || percentage === 0) return { Icon: TrendingUp, color: colors.info }
    if (percentage > 0) return { Icon: TrendingUp, color: trendingColorUp }
    return { Icon: TrendingDown, color: trendingColorDown }
  })

  const TrendIcon = $derived(trend.Icon as Component<{ size?: number; color?: string }>)
</script>

<div class="card">
  <div class="header">
    <div class="title-wrapper">
      <div class="title">{title}</div>
      <span class="value">{currencyFormat(Number(actualValue ?? 0))}</span>
    </div>

    <div class="icon">
      {#if icon}
        {@render icon()}
      {:else}
        <DollarSign size={48} color={colors[iconColor]} />
      {/if}
    </div>
  </div>

  <div class="line-wrapper">
    {#if percentage !== undefined}
      <div class="line">
        <TrendIcon size={32} color={trend.color} />
        <span class="body">{percentage}%</span>
      </div>
      <div class="line">
        <span class="body secondary">{previousLabel}</span>
      </div>
    {/if}
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

  .value {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .icon {
    display: flex;
    margin-top: 15px;
  }

  .line-wrapper {
    display: flex;
    flex-direction: row;
  }

  .line {
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-top: 10px;
    margin-right: 10px;
    width: auto;
  }

  .body {
    font-size: 0.875rem;
  }

  .secondary {
    color: rgb(116, 118, 126);
  }
</style>
