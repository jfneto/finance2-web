<script lang="ts">
  import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    type ChartData,
    type ChartDataset,
    type ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
  } from 'chart.js'
  import { onDestroy, onMount } from 'svelte'

  Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

  type BackendDataset = Omit<ChartDataset<'bar', number[]>, 'data'> & {
    data: Array<number | string>
  }

  interface BarChartData {
    labels: string[]
    datasets: BackendDataset[]
  }

  interface Props {
    title: string
    data: BarChartData
  }

  let { title, data }: Props = $props()

  let canvas: HTMLCanvasElement
  let chart = $state.raw<Chart<'bar'> | null>(null)

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: title,
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
  }

  const toChartData = (source?: BarChartData): ChartData<'bar'> => ({
    labels: source?.labels ?? [],
    datasets: (source?.datasets ?? []).map(({ data: values, yAxisID, ...dataset }) => ({
      ...dataset,
      data: values.map(Number),
      yAxisID: yAxisID === 'y-axis-gravity' ? 'y' : yAxisID,
    })),
  })
  onMount(() => {
    chart = new Chart(canvas, {
      type: 'bar',
      data: toChartData(data),
      options: chartOptions,
    })
  })

  $effect(() => {
    if (!chart) return

    chart.data = toChartData(data)
    chart.options = chartOptions
    chart.update()
  })

  onDestroy(() => {
    chart?.destroy()
    chart = null
  })
</script>

<div class="chart-container">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chart-container {
    position: relative;
    width: 100%;
    height: 320px;
  }
</style>
