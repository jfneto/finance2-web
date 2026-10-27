<script lang="ts">
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppCombo from '@lib/components/ui/inputs/AppCombo.svelte'
  import AppInputField from '@lib/components/ui/inputs/AppInputField.svelte'
  import AppSwitch from '@lib/components/ui/inputs/AppSwitch.svelte'
  import AppContainer from '@lib/components/ui/layout/AppContainer.svelte'
  import AppContainerItem from '@lib/components/ui/layout/AppContainerItem.svelte'
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { _ } from 'svelte-i18n'
  import { createPaymentFormsFormController } from './PaymentFormsForm,controller.svelte'
  import type { PaymentForm } from './paymentForm'

  interface Props {
    showModal?: boolean
    onClose: () => void
    selected?: PaymentForm | undefined
  }

  const controller = createPaymentFormsFormController(() => onClose())

  let { showModal = $bindable(false), onClose, selected }: Props = $props()

  let wasOpen = false

  $effect(() => {
    if (showModal && !wasOpen) {
      controller.initState(selected)
    }
    wasOpen = showModal
  })
</script>
<!--
<AppModal bind:open={showModal} title={`${$_('actions.create')} ${$_('account.model')}`} width="800px" {onClose}>
  <form onsubmit={controller.handleOnSubmit}>
    <input type="hidden" name="id" value={controller.id ?? ''}>
    <AppContainer gap="12px">
      <AppContainerItem size={12} align="left">
        <AppSwitch bind:checked={controller.active} label={$_('category.fields.active')} />
      </AppContainerItem>

      <AppContainerItem size={12} align="left">
        <AppSwitch bind:checked={controller.showInDashboard} label={$_('category.fields.showInDashboardActive')} />
      </AppContainerItem>

      <AppContainerItem size={12} align="left">
        <AppSwitch bind:checked={controller.showInLineGraph} label={$_('category.fields.showInLineGraphActive')} />
      </AppContainerItem>

      <AppContainerItem size={6}>
        <AppCombo
          items={controller.filteredCategories() ?? []}
          keyField="id"
          labelField="description"
          label={$_('category.fields.categoryId')}
          bind:value={controller.categoryId}
          disabled={controller.levelNumber <= 1}
        />
      </AppContainerItem>

      <AppContainerItem size={6}>
        <AppCombo
          items={controller.categoryTypeOptions ?? []}
          keyField="id"
          labelField="label"
          label={$_('category.fields.categoryType')}
          bind:value={controller.categoryType}
        />
      </AppContainerItem>

      <AppContainerItem size={12}>
        <AppInputField
          bind:value={controller.description}
          id="category[description]"
          name="description"
          label={$_('category.fields.description')}
        />
      </AppContainerItem>

      <AppContainerItem size={12}  align="right">
        <AppButton type="submit">
          {$_('actions.save')}
        </AppButton>
        <AppButton type="button" variant="danger" onclick={onClose}>
          {$_('actions.cancel')}
        </AppButton>
      </AppContainerItem>
    </AppContainer>
  </form>
</AppModal> -->
