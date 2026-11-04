<script lang="ts">
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppContainer from '@lib/components/ui/layout/AppContainer.svelte'
  import AppContainerItem from '@lib/components/ui/layout/AppContainerItem.svelte'
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { parseOfx } from '@lib/ofx'
  import { toast } from 'svelte-sonner'
  import { importerStore } from './importer.svelte'

  interface Props {
    showModal?: boolean
    onClose: () => void
  }

  let { showModal = $bindable(false), onClose }: Props = $props()

  let selectedFile = $state<File | null>(null)
  let loading = $state(false)

  const handleFileChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement
    const file = input.files?.[0] ?? null

    if (!file) return

    if (!file.name.toLowerCase().endsWith('.ofx')) {
      toast.error('Selecione um arquivo OFX válido.')
      input.value = ''
      selectedFile = null
      return
    }

    selectedFile = file
  }

  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault()

    if (!selectedFile || loading) return

    loading = true

    try {
      const content = await selectedFile.text()
      const result = parseOfx(content)

      console.log(result)

      importerStore.setTransactions(result.bankMessage.transactions || result.bankMessage.creditCardTransactions || [])
      importerStore.setBank(result.bank)

      toast.success('Arquivo OFX importado com sucesso.')

      selectedFile = null
      onClose()
    } catch (error) {
      console.error('OFX import error:', error)
      toast.error('Não foi possível processar o arquivo OFX.')
    } finally {
      loading = false
    }
  }

  const handleClose = (): void => {
    if (loading) return

    selectedFile = null
    onClose()
  }
</script>

<AppModal bind:open={showModal} title="Importar arquivo OFX" width="500px" onClose={handleClose}>
  <form onsubmit={handleSubmit}>
    <AppContainer gap="16px">
      <AppContainerItem size={12}>
        <label for="ofx-file">Arquivo OFX</label>

        <input id="ofx-file" type="file" accept=".ofx,application/x-ofx" onchange={handleFileChange} disabled={loading}>

        {#if selectedFile}
          <small> Arquivo selecionado: {selectedFile.name} </small>
        {/if}
      </AppContainerItem>

      <AppContainerItem size={12} align="right">
        <AppButton type="submit" disabled={!selectedFile || loading}>
          {loading ? 'Importando...' : 'Importar'}
        </AppButton>

        <AppButton type="button" variant="danger" onclick={handleClose} disabled={loading}> Cancelar </AppButton>
      </AppContainerItem>
    </AppContainer>
  </form>
</AppModal>
