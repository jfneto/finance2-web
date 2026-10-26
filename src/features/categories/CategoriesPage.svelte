<script lang="ts">
  import AppIconButton from '@lib/components/ui/buttons/AppIconButton.svelte'
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { Plus } from '@lucide/svelte'
  import { _ } from 'svelte-i18n'
  import CategoriesForm from './CategoriesForm.svelte'
  import { createCategoriesController } from './CategoriesPage.controller.svelte'

  const controller = createCategoriesController()
</script>

<SvelteHeader
  title={$_('account.layout.index.title')}
  name={$_('account.layout.index.name')}
  content={$_('accountType.layout.index.content')}
/>

{#snippet addAction()}
  <AppIconButton
    icon={Plus}
    onclick={() => {
      controller.selected = undefined
      controller.showModal = true
    }}
  />
{/snippet}

<AppPaper
  title={$_('account.layout.index.title')}
  searchable
  searchPlaceholder="Pesquisar por descrição..."
  bind:searchValue={controller.search}
  actions={addAction}
>
  <AppTable data={controller.getFilteredCategories() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>

<CategoriesForm
  showModal={controller.showModal}
  onClose={() => {
    controller.showModal = false
  }}
  selected={controller.selected}
/>
