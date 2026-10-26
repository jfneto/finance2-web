<script lang="ts">
  import AppIconButton from '@lib/components/ui/buttons/AppIconButton.svelte'
  import AppPaper from '@lib/components/ui/layout/AppPaper.svelte'
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import AppTable from '@lib/components/ui/table/AppTable.svelte'
  import { Plus } from '@lucide/svelte'
  import { _ } from 'svelte-i18n'
  import { createPaymentFormController } from './PaymentFormsPage.controller.svelte'

  const controller = createPaymentFormController()
</script>

<SvelteHeader
  title={$_('paymentForm.layout.index.title')}
  name={$_('paymentForm.layout.index.name')}
  content={$_('paymentForm.layout.index.content')}
/>

<!-- {#snippet addAction()}
  <AppIconButton
    icon={Plus}
    onclick={() => {
      controller.selected = undefined
      controller.showModal = true
    }}
  />
{/snippet} -->

<AppPaper
  title={$_('paymentForm.layout.index.title')}
  searchable
  searchPlaceholder={$_('actions.searchByDescription')}
  bind:searchValue={controller.search}
>
  <!-- actions={addAction} -->
  <AppTable data={controller.getFilteredpaymentForms() ?? []} columns={controller.columns} borderRadius="0 0 8px 8px" />
</AppPaper>
<!--
<PaymentFormsForm
  showModal={controller.showModal}
  onClose={() => {
    controller.showModal = false
  }}
  selected={controller.selected}
/> -->
