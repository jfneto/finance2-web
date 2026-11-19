<script lang="ts">
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppCombo from '@lib/components/ui/inputs/AppCombo.svelte'
  import AppInputField from '@lib/components/ui/inputs/AppInputField.svelte'
  import DatePicker from '@lib/components/ui/inputs/DatePicker.svelte'
  import AppContainer from '@lib/components/ui/layout/AppContainer.svelte'
  import AppContainerItem from '@lib/components/ui/layout/AppContainerItem.svelte'
  import AppModal from '@lib/components/ui/layout/AppModal.svelte'
  import { _ } from 'svelte-i18n'
  import { toast } from 'svelte-sonner'
  import { createMovimentFormController } from './MovimentForm.controller.svelte'
  import type { Moviment, MovimentPayloadForSearch } from './moviment'
  import { movimentByFilter } from './services'

  interface Props {
    showModal?: boolean
    onClose: () => void
    selected?: Moviment | undefined
    onSaved?: () => void
  }

  let { showModal = $bindable(false), onClose, onSaved, selected }: Props = $props()

  const controller = createMovimentFormController({ onClose: () => onClose(), onSaved: () => onSaved?.() })

  let wasOpen = false

  $effect(() => {
    if (showModal && !wasOpen) {
      controller.initState(selected)

      let searchPayload: MovimentPayloadForSearch

      if ((selected?.details.number_parcels ?? 1) > 1) {
        searchPayload = {
          dt_emission: selected?.dt_emission ?? '',
          description:
            selected?.details.description.substring(
              0,
              selected?.details.description.indexOf(String(selected?.details.parcel ?? 1)),
            ) ?? '',
          //e.details.description.substring(0, e.details.description.indexOf(tmpParcels.toString())).trim()
          number_parcels: selected?.details.number_parcels ?? 0,
          parcel: (selected?.details.parcel ?? 1) - 1,
        }
      } else {
        searchPayload = {
          description: selected?.details.description || '',
          number_parcels: 1,
          parcel: 1,
        }
      }

      console.log(searchPayload)
      movimentByFilter(searchPayload)
        .then((response) => {
          if (response) {
            toast.success('Dados do histórico de movimento carregados com sucesso.')
            controller.type = String(response.cred_deb_type)
            controller.obs = response.obs ?? ''
            controller.paymentForm = String(response.payment_form_id)
            controller.categoryId = String(response.category_id)
            controller.personId = String(response.person_id)
          }
        })
        .catch((error) => {
          console.error(error)
          toast.error('Ocorreu um erro ao buscar os dados do histórico de movimento.')
        })
    }
    wasOpen = showModal
  })
</script>

<AppModal bind:open={showModal} title={`${$_('actions.create')} ${$_('moviment.model')}`} width="800px" {onClose}>
  <form onsubmit={controller.handleOnSubmit}>
    <input type="hidden" name="id" value={controller.id ?? ''}>
    <AppContainer gap="12px">
      <!-- linha 1 -->
      <AppContainerItem size={3}>
        <AppCombo
          items={controller.categoryTypeOptions ?? []}
          keyField="id"
          labelField="label"
          label={$_('moviment.fields.credDebType')}
          bind:value={controller.type}
        />
      </AppContainerItem>

      <AppContainerItem size={9}>
        <AppInputField
          bind:value={controller.description}
          id="moviment[description]"
          name="description"
          label={$_('moviment.fields.description')}
        />
      </AppContainerItem>

      <!-- linha 2 -->
      <AppContainerItem size={6}>
        <AppCombo
          items={controller.paymentFormsQuery.data ?? []}
          keyField="id"
          labelField="description"
          label={$_('moviment.fields.paymentFormId')}
          bind:value={controller.paymentForm}
        />
      </AppContainerItem>
      <AppContainerItem size={6}>
        <AppCombo
          items={controller.filteredCategories ?? []}
          keyField="id"
          labelPrefix="category.description"
          labelField="description"
          label={$_('moviment.fields.categoryId')}
          bind:value={controller.categoryId}
        />
      </AppContainerItem>

      <!-- linha 3 -->
      <AppContainerItem size={12}>
        <AppInputField bind:value={controller.obs} id="moviment[obs]" name="obs" label={$_('moviment.fields.obs')} />
      </AppContainerItem>

      <!-- linha 4 -->
      <AppContainerItem size={12}>
        <AppCombo
          items={controller.peopleQuery.data ?? []}
          keyField="id"
          labelField="name"
          label={$_('moviment.fields.personId')}
          bind:value={controller.personId}
        />
      </AppContainerItem>

      <!-- linha 5 -->
      <AppContainerItem size={12}>
        <AppInputField
          bind:value={controller.fitId}
          id="moviment[fitId]"
          name="fitId"
          label={$_('moviment.fields.fitId')}
        />
      </AppContainerItem>

      <!-- linha 5 -->
      <AppContainerItem size={4}>
        <AppInputField
          bind:value={controller.parcelsNumber}
          id="moviment[numberParcels]"
          name="numberParcels"
          label={$_('moviment.fields.numberParcels')}
        />
      </AppContainerItem>
      <AppContainerItem size={4}>
        <AppInputField
          bind:value={controller.parcel}
          id="moviment[parcel]"
          name="parcel"
          label={$_('moviment.fields.parcel')}
        />
      </AppContainerItem>
      <AppContainerItem size={4}>
        <AppInputField
          bind:value={controller.value}
          id="moviment[value]"
          name="value"
          label={$_('moviment.fields.value')}
        />
      </AppContainerItem>

      <!-- linha 7 -->
      <AppContainerItem size={4}>
        <DatePicker label={$_('moviment.fields.dtEmission')} bind:value={controller.emission} />
      </AppContainerItem>
      <AppContainerItem size={4}>
        <DatePicker label={$_('moviment.fields.dtDue')} bind:value={controller.vencto} />
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
