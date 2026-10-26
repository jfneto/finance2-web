<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { MenuItem } from './MenuItem'

  interface Props {
    items: MenuItem[]
    activePath?: string
    collapsed?: boolean
    onNavigate?: (href: string) => void
    onToggle?: (collapsed: boolean) => void
    logo?: Snippet
    footer?: Snippet
  }

  let { items, activePath = '/', collapsed = $bindable(false), onNavigate, onToggle, logo, footer }: Props = $props()

  const toggle = () => {
    collapsed = !collapsed
    onToggle?.(collapsed)
  }

  const groupedItems = $derived.by(() => {
    const groups = new Map<string, MenuItem[]>()

    for (const item of items) {
      const group = item.group ?? ''

      if (!groups.has(group)) {
        groups.set(group, [])
      }

      groups.get(group)?.push(item)
    }

    return Array.from(groups, ([group, items]) => ({
      group,
      items,
    }))
  })
</script>

<aside class="drawer" class:collapsed>
  <div class="header">
    {#if logo && !collapsed}
      <div class="logo">
        {@render logo()}
      </div>
    {/if}

    <button
      class="toggle"
      type="button"
      aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
      aria-expanded={!collapsed}
      onclick={toggle}
    >
      {#if collapsed}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      {/if}
    </button>
  </div>

  <nav class="navigation" aria-label="Menu principal">
    {#each groupedItems as group (group.group)}
      <div class="menu-group">
        {#if group.group && !collapsed}
          <h2 class="group-title">{group.group}</h2>
        {/if}

        {#each group.items as item (item.href)}
          {@const Icon = item.icon}

          <button
            class="menu-item"
            class:active={activePath === item.href}
            type="button"
            aria-current={activePath === item.href ? 'page' : undefined}
            aria-label={collapsed ? item.label : undefined}
            title={collapsed ? item.label : undefined}
            onclick={() => onNavigate?.(item.href)}
          >
            <span class="icon">
              <Icon size={20} />
            </span>

            {#if !collapsed}
              <span class="label">{item.label}</span>
            {/if}
          </button>
        {/each}
      </div>
    {/each}
  </nav>
  <!-- <nav class="navigation" aria-label="Menu principal">
    {#each items as item (item.href)}
      {@const Icon = item.icon}
      <button
        class="menu-item"
        class:active={activePath === item.href}
        type="button"
        aria-current={activePath === item.href ? 'page' : undefined}
        aria-label={collapsed ? item.label : undefined}
        title={collapsed ? item.label : undefined}
        onclick={() => onNavigate?.(item.href)}
      >
        <span class="icon">
          <Icon size={20} /></span
        >

        {#if !collapsed}
          <span class="label">{item.label}</span>
        {/if}
      </button>
    {/each}
  </nav> -->

  {#if footer}
    <div class="footer">
      {@render footer()}
    </div>
  {/if}
</aside>

<style>
  .drawer {
    height: 100dvh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 240px;
    overflow: hidden;
    border-right: 1px solid var(--color-border);
    background: var(--color-surface);
    transition: width 180ms ease;
  }

  .drawer.collapsed {
    width: 64px;
  }

  .header {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 64px;
    padding: 12px;
    gap: 8px;
  }

  .collapsed .header {
    justify-content: center;
    padding-inline: 8px;
  }

  .logo {
    min-width: 0;
    overflow: hidden;
    color: var(--color-text);
    font-weight: 600;
    white-space: nowrap;
    padding-right: 44px;
  }

  .toggle,
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 0;
    border-radius: var(--radius-sm, 4px);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .toggle {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 0;
    border-radius: var(--radius-sm, 4px);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .collapsed .toggle {
    right: 12px;
  }

  .toggle:hover,
  .menu-item:hover {
    background: var(--color-input);
    color: var(--color-text);
  }

  .toggle svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .navigation {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 0;
  }

  .menu-item {
    justify-content: flex-start;
    width: 100%;
    min-height: 44px;
    padding: 0 12px;
    gap: 12px;
    text-align: left;
    white-space: nowrap;
  }

  .collapsed .menu-item {
    justify-content: center;
    padding-inline: 0;
  }

  .menu-item.active {
    background: var(--color-input);
    color: var(--color-primary);
  }

  .icon {
    display: inline-flex;
    flex: 0 0 20px;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  .label {
    overflow: hidden;
    font-size: 0.875rem;
    text-overflow: ellipsis;
  }

  .footer {
    flex-shrink: 0;
    margin-top: auto;
    padding: 12px;
    border-top: 1px solid var(--color-border);
  }

  @media (prefers-reduced-motion: reduce) {
    .drawer {
      transition: none;
    }
  }

  .menu-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-border);
  }

  .group-title {
    margin: 16px 12px 4px;
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .menu-group:first-child .group-title {
    margin-top: 4px;
  }

  .menu-group:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
</style>
