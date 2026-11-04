<script lang="ts">
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppCombo from '@lib/components/ui/inputs/AppCombo.svelte'
  import AppInputField from '@lib/components/ui/inputs/AppInputField.svelte'
  import AppSwitch from '@lib/components/ui/inputs/AppSwitch.svelte'
  import AppContainer from '@lib/components/ui/layout/AppContainer.svelte'
  import AppContainerItem from '@lib/components/ui/layout/AppContainerItem.svelte'
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { _ } from 'svelte-i18n'
  import { createAccountsFormController } from './AccountsForm.controller.svelte'
  import type { Account } from './account'

  interface Props {
    showModal?: boolean
    onClose: () => void
    selected?: Account | undefined
    onSubmit?: () => void
    refreshOnSubmit?: () => void
  }

  let { showModal = $bindable(false), onClose, selected, refreshOnSubmit }: Props = $props()

  const controller = createAccountsFormController({
    onRefresh: () => refreshOnSubmit?.(),
    onSubmitted: () => onClose(),
  })

  let wasOpen = false

  $effect(() => {
    if (showModal && !wasOpen) {
      controller.initState(selected)
    }
    wasOpen = showModal
  })
</script>

<AppModal bind:open={showModal} title={`${$_('actions.create')} ${$_('account.model')}`} width="800px" {onClose}>
  <form onsubmit={controller.handleOnSubmit}>
    <input type="hidden" name="id" value={controller.id ?? ''}>
    <AppContainer gap="12px">
      <!-- linha 1 -->
      <AppContainerItem size={2}>
        <AppSwitch bind:checked={controller.active} label={$_('account.fields.active')} />
      </AppContainerItem>

      <AppContainerItem size={10}>
        <AppCombo
          items={controller.accountTypesQuery.data ?? []}
          keyField="id"
          labelField="description"
          label={$_('account.fields.accountTypeId')}
          bind:value={controller.accountTypeId}
        />
      </AppContainerItem>

      <!-- linha 2 -->
      <AppContainerItem size={9}>
        <AppInputField bind:value={controller.name} id="account[name]" name="name" label={$_('account.fields.name')} />
      </AppContainerItem>

      <AppContainerItem size={3}>
        <AppInputField
          bind:value={controller.balance}
          id="account[balance]"
          name="balance"
          label={$_('account.fields.balance')}
        />
      </AppContainerItem>

      <!-- linha 3 -->
      <AppContainerItem size={3}>
        <AppInputField
          bind:value={controller.bankAgency}
          id="account[bank_branch_id]"
          name="bank_branch_id"
          label={$_('account.fields.branBranchId')}
        />
      </AppContainerItem>

      <AppContainerItem size={3}>
        <AppInputField
          bind:value={controller.bankAccount}
          id="account[bank_account_number]"
          name="balance"
          label={$_('account.fields.bankAccountNumber')}
        />
      </AppContainerItem>

      <AppContainerItem size={6}>
        <AppInputField
          bind:value={controller.creditCard}
          id="account[credit_card_number]"
          name="credit_card_number"
          label={$_('account.fields.creditCardNumber')}
        />
      </AppContainerItem>

      <AppContainerItem size={12} align="right">
        <AppButton type="submit">
          {$_('actions.save')}
        </AppButton>
        <AppButton type="button" variant="danger" onclick={onClose}>
          {$_('actions.cancel')}
        </AppButton>
      </AppContainerItem>
    </AppContainer>
  </form>
</AppModal>
