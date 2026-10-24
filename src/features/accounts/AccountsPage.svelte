<script lang="ts">
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { _ } from 'svelte-i18n'
  import { createAccountsController } from './Account.controller.svelte'

  const controller = createAccountsController()
</script>

<SvelteHeader
  title={$_('account.layout.index.title')}
  name={$_('account.layout.index.name')}
  content={$_('accountType.layout.index.content')}
/>

<AppPaper
  title={$_('account.layout.index.title')}
  searchable
  searchPlaceholder="Pesquisar por descrição..."
  bind:searchValue={controller.search}
>
  <AppTable data={controller.getFilteredAccounts() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>
