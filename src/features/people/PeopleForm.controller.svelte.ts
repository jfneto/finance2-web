import { get } from 'svelte/store'
import { _ } from 'svelte-i18n'
import { toast } from 'svelte-sonner'
import type { Person } from './Person'
import { personCreate, personUpdate } from './services'

const createPersonFormController = (onSubmitted?: () => void) => {
  let id = $state<number | undefined>(undefined)
  let name = $state<string>('')
  let personType = $state<string>('')

  const initState = (selected?: Person) => {
    id = selected?.id ?? undefined
    name = selected?.name ?? ''
    personType = selected?.person_type ?? 'F'
  }

  const handleOnSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // seguir daqui e montar o payload tipado e carregar o evento de envio para o backend
    const payload: Person = {
      id: Number(id) ?? undefined,
      name: name,
      person_type: personType,
    }

    onSubmitted?.()

    if (id === undefined) {
      personCreate(payload)
        .then(() => {
          toast.success('Pessoa criada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possivel criar a Pessoa')
        })
    } else {
      personUpdate(payload)
        .then(() => {
          toast.success('Pessoa atualizada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possível atualizar a Pessoa')
        })
    }
  }

  const personTypeOptions = [
    { id: 'F', label: get(_)('person.personType.F') },
    { id: 'J', label: get(_)('person.personType.J') },
  ]

  return {
    initState,
    handleOnSubmit,
    personTypeOptions,

    get id() {
      return id
    },
    set id(value) {
      id = value
    },
    get name() {
      return name
    },
    set name(value) {
      name = value
    },
    get personType() {
      return personType
    },
    set personType(value) {
      personType = value
    },
  }
}

export { createPersonFormController }
