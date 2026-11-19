<script lang="ts" generics="T extends object">
  interface Props {
    items: T[]
    keyField: keyof T
    labelField: keyof T
    labelPrefix?: string
    label: string
    value?: T[keyof T] | undefined
    disabled?: boolean
    name?: string
    onchange?: (value: T[keyof T] | undefined) => void
  }

  let {
    items,
    keyField,
    labelPrefix,
    labelField,
    label,
    value = $bindable(),
    disabled = false,
    name,
    onchange,
  }: Props = $props()

  const id = $props.id()
  const listId = `${id}-list`

  let query = $state('')
  let open = $state(false)
  let inputElement = $state<HTMLInputElement>()
  let listElement = $state<HTMLUListElement>()

  let selectedItem = $derived(items.find((item) => String(item[keyField]) === String(value)))

  let filteredItems = $derived(items.filter((item) => getLabel(item).toLowerCase().includes(query.toLowerCase())))

  const positionList = () => {
    if (!inputElement || !listElement) return

    const rect = inputElement.getBoundingClientRect()
    const gap = 4
    const maxHeight = 240
    const spaceBelow = window.innerHeight - rect.bottom - gap
    const spaceAbove = rect.top - gap
    const showAbove = spaceBelow < Math.min(maxHeight, filteredItems.length * 40) && spaceAbove > spaceBelow
    const availableHeight = Math.max(0, Math.min(maxHeight, showAbove ? spaceAbove : spaceBelow))

    listElement.style.position = 'fixed'
    listElement.style.left = `${rect.left}px`
    listElement.style.width = `${rect.width}px`
    listElement.style.maxHeight = `${availableHeight}px`
    listElement.style.top = showAbove ? 'auto' : `${rect.bottom + gap}px`
    listElement.style.bottom = showAbove ? `${window.innerHeight - rect.top + gap}px` : 'auto'
  }

  const selectItem = (item: T) => {
    value = item[keyField]
    query = ''
    open = false
    onchange?.(value)
  }

  const handleBlur = (event: FocusEvent) => {
    const nextTarget = event.relatedTarget

    if (nextTarget instanceof Node && listElement?.contains(nextTarget)) {
      return
    }

    query = ''
    open = false
  }

  const handleInput = (event: Event) => {
    query = (event.currentTarget as HTMLInputElement).value
    open = true
  }

  const getByPath = (source: unknown, path: string): unknown =>
    path.split('.').reduce<unknown>((acc, key) => (acc as Record<string, unknown> | null | undefined)?.[key], source)

  const getLabel = (item: T | undefined): string => {
    if (!item) return ''

    const prefix = labelPrefix ? getByPath(item, labelPrefix) : undefined
    const text = String(item[labelField] ?? '')

    return prefix ? `${String(prefix)}/${text}` : text
  }

  $effect(() => {
    if (open && !disabled && listElement) {
      if (!listElement.matches(':popover-open')) {
        listElement.showPopover()
      }

      positionList()

      window.addEventListener('resize', positionList)
      window.addEventListener('scroll', positionList, true)

      return () => {
        window.removeEventListener('resize', positionList)
        window.removeEventListener('scroll', positionList, true)
      }
    }

    if (listElement?.matches(':popover-open')) {
      listElement.hidePopover()
    }
  })
</script>

<div class="combo" class:focused={open} class:disabled>
  <label for={id} class="floating-label" class:raised={open || query || selectedItem}>
    {label}
  </label>

  <input
    bind:this={inputElement}
    {id}
    {name}
    role="combobox"
    aria-expanded={open}
    aria-controls={listId}
    aria-autocomplete="list"
    autocomplete="off"
    {disabled}
    value={query || getLabel(selectedItem)}
    onfocus={() => {
      open = true
    }}
    oninput={handleInput}
    onblur={handleBlur}
  >

  <span class="arrow" aria-hidden="true">▾</span>

  {#if open && !disabled}
    <!-- biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: listbox contém opções selecionáveis -->
    <ul bind:this={listElement} id={listId} role="listbox" popover="manual">
      {#each filteredItems as item (String(item[keyField]))}
        <li>
          <button
            type="button"
            aria-pressed={String(item[keyField]) === String(value)}
            onmousedown={(event) => event.preventDefault()}
            onclick={() => selectItem(item)}
          >
            {getLabel(item)}
          </button>
        </li>
      {/each}

      {#if filteredItems.length === 0}
        <li class="empty">Nenhum resultado encontrado</li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .combo {
    position: relative;
    width: 100%;
  }

  .combo input {
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 16px 36px 8px 12px;
    border: 1px solid var(--color-border, #777);
    border-radius: 4px;
    background: var(--color-surface, transparent);
    color: inherit;
    font: inherit;
    outline: none;
  }

  .combo.focused input {
    border: 2px solid var(--color-primary, #2563eb);
    padding-left: 11px;
  }

  .floating-label {
    position: absolute;
    z-index: 1;
    top: 18px;
    left: 12px;
    padding: 0 4px;
    color: var(--color-muted, #777);
    background: var(--color-surface, white);
    pointer-events: none;
    transition:
      top 120ms ease,
      font-size 120ms ease;
  }

  .floating-label.raised {
    top: -8px;
    font-size: 12px;
  }

  .arrow {
    position: absolute;
    top: 18px;
    right: 12px;
    pointer-events: none;
  }

  .combo ul[popover] {
    position: fixed;
    inset: auto;
    z-index: 1000;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 4px 0;
    overflow-y: auto;
    list-style: none;
    border: 1px solid var(--color-border, #777);
    border-radius: 4px;
    background: var(--color-surface, white);
    color: inherit;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  }

  .combo li button {
    width: 100%;
    padding: 10px 12px;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    font: inherit;
  }

  .combo li button:hover,
  .combo li button:focus-visible {
    background: var(--color-hover, rgb(127 127 127 / 15%));
  }

  .combo .empty {
    padding: 12px;
    color: var(--color-muted, #777);
  }

  .combo.disabled {
    opacity: 0.5;
  }
</style>
