<script lang="ts">
  import { createImporterPageController } from '@features/importer'
  import MovimentForm from '@features/moviments/MovimentForm.svelte'
  import AppIconButton from '@lib/components/ui/buttons/AppIconButton.svelte'
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { FileDown } from '@lucide/svelte'
  import { _ } from 'svelte-i18n'
  import ImporterForm from './ImporterForm.svelte'

  const controller = createImporterPageController()
</script>

<SvelteHeader
  title={$_('importer.layout.index')}
  name={$_('import.layout.name')}
  content={$_('improt.layout.content')}
/>

{#snippet addAction()}
  <AppIconButton
    icon={FileDown}
    onclick={() => {
      controller.showModal = true
    }}
  />
{/snippet}

<AppPaper
  title={$_('importer.layout.index')}
  searchable
  searchPlaceholder={$_('actions.searchByDescription')}
  actions={addAction}
  bind:searchValue={controller.search}
>
  <AppTable data={controller.getFilteredTransactions() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />

  <ImporterForm
    showModal={controller.showModal}
    onClose={() => {
      controller.showModal = false
    }}
  />

  <MovimentForm
    showModal={controller.showMovimentForm}
    onClose={() => {
      controller.showMovimentForm = false
    }}
    selected={controller.moviment}
    onSaved={controller.removeSelectedTransactionConverted}
  />
</AppPaper>
