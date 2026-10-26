<script lang="ts">
  import AppSwitch from '@lib/components/ui/inputs/AppSwitch.svelte'
  import FloatingField from '@lib/components/ui/inputs/FloatingField.svelte'
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { _ } from 'svelte-i18n'
  import type { Account } from './account'

  interface Props {
    showModal?: boolean
    onClose: () => void
    selected?: Account | undefined
  }

  let { showModal = $bindable(false), onClose, selected }: Props = $props()

  // svelte-ignore state_referenced_locally
  // const initialActive = selected?.active ?? true
  let active = $state<boolean>(false)
  let wasOpen = false

  $effect(() => {
    if (showModal && !wasOpen) {
      console.log(selected?.active)
      active = selected?.active ?? false
    }
    wasOpen = showModal
  })
</script>

<AppModal bind:open={showModal} title={`${$_('actions.create')} ${$_('account.model')}`} width="560px" {onClose}>
  <AppSwitch bind:checked={active} label={$_('account.fields.active')} />
  <FloatingField id="" label="" />
</AppModal>
