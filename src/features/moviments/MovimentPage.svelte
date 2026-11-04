<script lang="ts">
  import AppIconButton from '@lib/components/ui/buttons/AppIconButton.svelte'
  import { confirmDialog } from '@lib/components/ui/dialogs/confirm.svelte'
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { HandCoins, Plus } from '@lucide/svelte'
  import { _ } from 'svelte-i18n'
  import { toast } from 'svelte-sonner'
  import MovimentForm from './MovimentForm.svelte'
  import { createMovimentPageController } from './MovimentPage.controller.svelte'
  import { movimentClose } from './services'

  const controller = createMovimentPageController()
</script>

<SvelteHeader
  title={$_('moviment.layout.index.title')}
  name={$_('moviment.layout.index.name')}
  content={$_('moviment.layout.index.content')}
/>

{#snippet addAction()}
  <AppIconButton
    icon={Plus}
    onclick={() => {
      controller.selected = undefined
      controller.showModal = true
    }}
  />
  <AppIconButton
    icon={HandCoins}
    onclick={async () => {
      const confirmed = await confirmDialog({
        title: 'Fechar movimentos?',
        description: 'Após o fechamento, não será possível alterar os movimentos.',
        confirmLabel: 'Fechar Movimentos',
        cancelLabel: 'Cancelar',
        destructive: true,
      })

      if (!confirmed) return

      movimentClose()
        .then(() => {
          toast.success('movimentos fechados com sucesso')
          controller.movimentsQuery.refetch()
        })
        .catch((error) => {
          toast.error(`Ocorreu um erro ao fechar o período. Por favor, tente novamente. ${error}`)
        })
    }}
  />
{/snippet}

<AppPaper
  title={$_('moviment.layout.index.title')}
  searchable
  searchPlaceholder={$_('actions.searchByDescription')}
  bind:searchValue={controller.search}
  actions={addAction}
>
  <AppTable data={controller.getFilteredMoviments() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>

<MovimentForm
  showModal={controller.showModal}
  onClose={() => {
    controller.showModal = false
  }}
  selected={controller.selected}
/>
