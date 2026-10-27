<script lang="ts">
  import AppIconButton from '@lib/components/ui/buttons/AppIconButton.svelte'
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { Plus } from '@lucide/svelte'
  import { _ } from 'svelte-i18n'
  import PeopleForm from './PeopleForm.svelte'
  import { createPeopleController } from './PeoplePage.controller.svelte'

  const controller = createPeopleController()
</script>

<SvelteHeader
  title={$_('person.layout.index.title')}
  name={$_('person.layout.index.name')}
  content={$_('person.layout.index.content')}
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
  title={$_('person.layout.index.title')}
  searchable
  searchPlaceholder={$_('actions.searchByDescription')}
  bind:searchValue={controller.search}
  actions={addAction}
>
  <AppTable data={controller.getFilteredPeople() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>

<PeopleForm
  showModal={controller.showModal}
  onClose={() => {
    controller.showModal = false
  }}
  selected={controller.selected}
/>
