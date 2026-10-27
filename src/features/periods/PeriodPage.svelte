<script lang="ts">
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { _ } from 'svelte-i18n'
  import { createPeriodController } from './PeriodPage.controller.svelte'

  const controller = createPeriodController()
</script>

<SvelteHeader
  title={$_('period.layout.index.title')}
  name={$_('period.layout.index.name')}
  content={$_('period.layout.index.content')}
/>

<AppPaper
  title={$_('period.layout.index.title')}
  searchable
  searchPlaceholder={$_('actions.searchByDescription')}
  bind:searchValue={controller.search}
>
  <AppTable data={controller.getFilteredPeriod() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>
