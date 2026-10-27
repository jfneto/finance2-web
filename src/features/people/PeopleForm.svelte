<script lang="ts">
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppCombo from '@lib/components/ui/inputs/AppCombo.svelte'
  import AppInputField from '@lib/components/ui/inputs/AppInputField.svelte'
  import AppContainer from '@lib/components/ui/layout/AppContainer.svelte'
  import AppContainerItem from '@lib/components/ui/layout/AppContainerItem.svelte'
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { _ } from 'svelte-i18n'
  import { createPersonFormController } from './PeopleForm.controller.svelte'
  import type { Person } from './Person'

  interface Props {
    showModal?: boolean
    onClose: () => void
    selected?: Person | undefined
  }

  const controller = createPersonFormController(() => onClose())

  let { showModal = $bindable(false), onClose, selected }: Props = $props()

  let wasOpen = false

  $effect(() => {
    if (showModal && !wasOpen) {
      controller.initState(selected)
    }
    wasOpen = showModal
  })
</script>

<AppModal bind:open={showModal} title={`${$_('actions.create')} ${$_('person.model')}`} width="800px" {onClose}>
  <form onsubmit={controller.handleOnSubmit}>
    <input type="hidden" name="id" value={controller.id ?? ''}>
    <AppContainer gap="12px">
      <!-- linha 1 -->
      <AppContainerItem size={6}>
        <AppCombo
          items={controller.personTypeOptions ?? []}
          keyField="id"
          labelField="label"
          label={$_('person.fields.personType')}
          bind:value={controller.personType}
        />
      </AppContainerItem>

      <!-- linha 2 -->
      <AppContainerItem size={6}>
        <AppInputField bind:value={controller.name} id="account[name]" name="name" label={$_('account.fields.name')} />
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
