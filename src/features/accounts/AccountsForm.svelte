<script lang="ts">
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { _ } from 'svelte-i18n'

  interface Props {
    showModal: boolean
  }

  let { showModal }: Props = $props()
</script>

<AppModal
  bind:open={showModal}
  title={`${$_('actions.create')} ${$_('account.model')}`}
  width="560px"
  onClose={() => (showModal = false)}
>
  <p>Conteúdo do modal.</p>
</AppModal>
