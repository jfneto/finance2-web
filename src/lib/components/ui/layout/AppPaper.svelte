<script lang="ts">
  import { Search, X } from '@lucide/svelte'
  import type { Snippet } from 'svelte'
  import { get } from 'svelte/store'
  import { _ } from 'svelte-i18n'

  interface Props {
    title: string
    children: Snippet
    padding?: string
    searchable?: boolean
    searchPlaceholder?: string
    searchValue?: string
    onSearch?: (value: string) => void
    actions?: Snippet
  }

  let {
    title,
    children,
    padding = '0px',
    searchable = false,
    searchPlaceholder = get(_)('actions.search'),
    searchValue = $bindable(''),
    onSearch,
    actions,
  }: Props = $props()

  const handleSearch = (value: string) => {
    searchValue = value
    onSearch?.(value)
  }
</script>

<section class="paper">
  <header class="paper-header">
    <h2>{title}</h2>

    <div class="header-actions">
      {#if searchable}
        <div class="search-field">
          <Search size={16} />

          <input
            type="search"
            value={searchValue}
            placeholder={searchPlaceholder}
            oninput={(event) => handleSearch(event.currentTarget.value)}
          >

          {#if searchValue}
            <button type="button" aria-label="Limpar pesquisa" onclick={() => handleSearch('')}>
              <X size={16} />
            </button>
          {/if}
        </div>
      {/if}

      {#if actions}
        {@render actions()}
      {/if}
    </div>
  </header>

  <div class="paper-content" style:padding>
    {@render children()}
  </div>
</section>

<style>
  .paper {
    box-sizing: border-box;
    width: auto;
    max-height: 90vh;
    overflow-y: auto;
    margin-left: 10px;
    margin-right: 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
  }

  .paper-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid var(--color-border);
  }

  .paper-header h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 12px;
  }

  .search-field {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 220px;
    padding: 8px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm, 4px);
    color: var(--color-text-muted);
  }

  .search-field input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;
  }

  .search-field button {
    display: flex;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .paper-content {
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    .paper-header {
      align-items: stretch;
      flex-direction: column;
      padding: 16px;
    }

    .header-actions {
      justify-content: stretch;
    }

    .search-field {
      min-width: 0;
      flex: 1;
    }
  }
</style>
