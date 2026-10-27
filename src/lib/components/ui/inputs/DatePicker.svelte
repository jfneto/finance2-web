<script lang="ts">
  import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { onMount } from 'svelte'

  interface Props {
    label: string
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
  }

  type CalendarView = 'days' | 'months' | 'years'

  let { label, value = $bindable(''), onChange, disabled = false }: Props = $props()

  const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const parseDate = (date: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined

    const [year, month, day] = date.split('-').map(Number)
    const parsed = new Date(year, month - 1, day)

    if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
      return undefined
    }

    return parsed
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const selectedDate = $derived(parseDate(value))

  let isOpen = $state(false)
  let visibleMonth = $state(new Date().getMonth())
  let visibleYear = $state(new Date().getFullYear())
  let calendarView = $state<CalendarView>('days')
  let fieldElement: HTMLDivElement
  let calendarElement = $state<HTMLDivElement>()
  let portalElement = $state<HTMLDivElement | undefined>()
  let position = $state({ top: 0, left: 0, width: 280 })
  let fieldId = $state(`datepicker-${Math.random().toString(36).slice(2)}`)

  const years = $derived.by(() => Array.from({ length: 20 }, (_, index) => visibleYear - 10 + index))

  const calendarDays = $derived.by(() => {
    const firstDay = new Date(visibleYear, visibleMonth, 1).getDay()
    const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate()
    const daysInPreviousMonth = new Date(visibleYear, visibleMonth, 0).getDate()

    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - firstDay + 1

      if (dayNumber < 1) {
        return {
          day: daysInPreviousMonth + dayNumber,
          date: new Date(visibleYear, visibleMonth - 1, daysInPreviousMonth + dayNumber),
          outside: true,
        }
      }

      if (dayNumber > daysInMonth) {
        return {
          day: dayNumber - daysInMonth,
          date: new Date(visibleYear, visibleMonth + 1, dayNumber - daysInMonth),
          outside: true,
        }
      }

      return {
        day: dayNumber,
        date: new Date(visibleYear, visibleMonth, dayNumber),
        outside: false,
      }
    })
  })

  const updatePosition = () => {
    if (!fieldElement) return

    const rect = fieldElement.getBoundingClientRect()
    const width = 280
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))

    position = {
      top: rect.bottom + 4,
      left,
      width,
    }
  }

  const openCalendar = () => {
    if (disabled) return

    const initialDate = selectedDate ?? new Date()

    visibleMonth = initialDate.getMonth()
    visibleYear = initialDate.getFullYear()
    calendarView = 'days'

    updatePosition()
    isOpen = true
  }

  const closeCalendar = () => {
    isOpen = false
  }

  const selectDate = (date: Date) => {
    value = formatDate(date)
    onChange?.(value)
    closeCalendar()
  }

  const changeMonth = (amount: number) => {
    const date = new Date(visibleYear, visibleMonth + amount, 1)

    visibleMonth = date.getMonth()
    visibleYear = date.getFullYear()
  }

  const changeYearRange = (amount: number) => {
    visibleYear += amount * 20
  }

  const selectYear = (year: number) => {
    visibleYear = year
    calendarView = 'months'
  }

  const selectMonth = (month: number) => {
    visibleMonth = month
    calendarView = 'days'
  }

  const toggleCalendarView = () => {
    if (calendarView === 'days') {
      calendarView = 'years'
    } else if (calendarView === 'years') {
      calendarView = 'months'
    } else {
      calendarView = 'days'
    }
  }

  const isSelected = (date: Date) => selectedDate !== undefined && formatDate(selectedDate) === formatDate(date)

  const isToday = (date: Date) => formatDate(date) === formatDate(new Date())

  onMount(() => {
    portalElement = document.createElement('div')
    portalElement.dataset.datepickerPortal = ''
    document.body.appendChild(portalElement)

    return () => portalElement?.remove()
  })

  $effect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node

      if (!fieldElement?.contains(target) && !calendarElement?.contains(target)) {
        closeCalendar()
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCalendar()
    }

    const handleReposition = () => updatePosition()

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  })
</script>

<div class="field" bind:this={fieldElement}>
  <div class="field-control" class:focused={isOpen} class:filled={value !== ''}>
    <span id={fieldId} class="field-value">
      {#if value}
        {value.split('-').reverse().join('/')}
      {/if}
    </span>

    <span id={`${fieldId}-label`} class="field-label">
      {label}
    </span>

    <button
      class="calendar-trigger"
      type="button"
      aria-label="Abrir calendário"
      aria-expanded={isOpen}
      {disabled}
      onclick={() => (isOpen ? closeCalendar() : openCalendar())}
    >
      <CalendarDays size={18} />
    </button>
  </div>
</div>

{#if isOpen && portalElement}
  <div
    class="calendar-popup"
    style={`top:${position.top}px;left:${position.left}px;width:${position.width}px`}
    bind:this={calendarElement}
    role="dialog"
    aria-label="Selecionar data"
  >
    <div class="calendar-header">
      <button
        type="button"
        class="nav-button"
        aria-label={calendarView === 'days'
          ? 'Mês anterior'
          : calendarView === 'years'
            ? 'Anos anteriores'
            : 'Voltar para anos'}
        onclick={() => {
          if (calendarView === 'days') {
            changeMonth(-1)
          } else if (calendarView === 'years') {
            changeYearRange(-1)
          } else {
            calendarView = 'years'
          }
        }}
      >
        <ChevronLeft size={18} />
      </button>

      <button type="button" class="calendar-title" onclick={toggleCalendarView}>
        {#if calendarView === 'days'}
          {months[visibleMonth]} {visibleYear}
        {:else if calendarView === 'months'}
          {visibleYear}
        {:else}
          {years[0]}
          – {years[years.length - 1]}
        {/if}
      </button>

      {#if calendarView === 'days'}
        <button type="button" class="nav-button" aria-label="Próximo mês" onclick={() => changeMonth(1)}>
          <ChevronRight size={18} />
        </button>
      {:else if calendarView === 'years'}
        <button type="button" class="nav-button" aria-label="Próximos anos" onclick={() => changeYearRange(1)}>
          <ChevronRight size={18} />
        </button>
      {:else}
        <span class="nav-placeholder"></span>
      {/if}
    </div>

    {#if calendarView === 'years'}
      <div class="calendar-grid picker-grid years-grid">
        {#each years as year (year)}
          <button
            type="button"
            class="picker-option"
            class:selected={year === visibleYear}
            onclick={() => selectYear(year)}
          >
            {year}
          </button>
        {/each}
      </div>
    {:else if calendarView === 'months'}
      <div class="calendar-grid picker-grid months-grid">
        {#each months as month, index (month)}
          <button
            type="button"
            class="picker-option"
            class:selected={index === visibleMonth}
            onclick={() => selectMonth(index)}
          >
            {month.slice(0, 3)}
          </button>
        {/each}
      </div>
    {:else}
      <div class="calendar-grid">
        {#each weekdays as weekday, index (`${weekday}-${index}`)}
          <span class="weekday">{weekday}</span>
        {/each}

        {#each calendarDays as item, index (`${visibleYear}-${visibleMonth}-${index}`)}
          <button
            type="button"
            class="day"
            class:outside={item.outside}
            class:selected={isSelected(item.date)}
            class:today={isToday(item.date)}
            aria-label={`${item.day} de ${months[item.date.getMonth()]} de ${item.date.getFullYear()}`}
            aria-pressed={isSelected(item.date)}
            onclick={() => selectDate(item.date)}
          >
            {item.day}
          </button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .field {
    width: 100%;
    min-width: 0;
  }

  .field-control {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 0 12px 0 14px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .field-control.focused {
    border-color: var(--color-primary);
    outline: 1px solid var(--color-primary);
  }

  .field-value {
    flex: 1;
    min-width: 0;
    padding-top: 5px;
    font: inherit;
    line-height: 1.4;
  }

  .field-label {
    position: absolute;
    top: 50%;
    left: 10px;
    padding: 0 4px;
    transform: translateY(-50%);
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-size: 16px;
    line-height: 1;
    pointer-events: none;
    transition:
      top 120ms ease,
      font-size 120ms ease;
  }

  .filled .field-label,
  .focused .field-label {
    top: 0;
    font-size: 12px;
  }

  .focused .field-label {
    color: var(--color-primary);
  }

  .calendar-trigger {
    display: flex;
    flex: 0 0 32px;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-left: auto;
    padding: 0;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .calendar-trigger:hover {
    background: var(--color-border);
    color: var(--color-text);
  }

  .calendar-trigger:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .calendar-popup {
    position: fixed;
    z-index: 2147483647;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: 0 8px 24px rgb(0 0 0 / 22%);
  }

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .calendar-title {
    flex: 1;
    padding: 8px 4px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
  }

  .calendar-title:hover,
  .picker-option:hover {
    background: var(--color-border);
  }

  .nav-button {
    display: grid;
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .nav-button:hover,
  .day:hover {
    background: var(--color-border);
  }

  .nav-placeholder {
    flex: 0 0 32px;
    width: 32px;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 2px;
  }

  .picker-grid {
    display: grid;
    align-items: stretch;
    gap: 4px;
  }

  .picker-grid.years-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(4, 48px);
  }

  .picker-grid.months-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(4, 48px);
  }

  .picker-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    min-height: 0;
    padding: 0 4px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }

  .picker-option.selected {
    background: var(--color-primary);
    color: white;
  }

  .weekday {
    display: grid;
    height: 30px;
    place-items: center;
    color: var(--color-text-muted);
    font-size: 12px;
  }

  .day {
    display: grid;
    aspect-ratio: 1;
    min-width: 0;
    place-items: center;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }

  .day.outside {
    color: var(--color-text-muted);
    opacity: 0.5;
  }

  .day.today {
    outline: 1px solid var(--color-primary);
    outline-offset: -2px;
  }

  .day.selected {
    background: var(--color-primary);
    color: white;
  }
</style>
