<script lang="ts">
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { _ } from 'svelte-i18n'
  import { createAccountTypesController } from './AccountTypes.controller.svelte'

  const controller = createAccountTypesController()
</script>

<SvelteHeader
  title={$_('accountType.layout.index.title')}
  name={$_('accountType.layout.index.name')}
  content={$_('accountType.layout.index.content')}
/>

<AppPaper
  title={$_('accountType.layout.index.title')}
  searchable
  searchPlaceholder={$_('actions.searchByDescription')}
  bind:searchValue={controller.search}
>
  <AppTable data={controller.getFilteredAccountTypes() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>
