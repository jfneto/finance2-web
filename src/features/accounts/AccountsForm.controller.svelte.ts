import { accountTypesQueryOptions } from '@features/account-types/account-types.query'
import { createQuery } from '@tanstack/svelte-query'
import { toast } from 'svelte-sonner'
import type { Account } from './account'
import { createAccount, updateAccount } from './services'

const createAccountsFormController = (onSubmitted?: () => void) => {
  const accountTypesQuery = createQuery(() => ({
    ...accountTypesQueryOptions(),
  }))

  let id = $state<number | undefined>(undefined)
  let active = $state<boolean>(false)
  let name = $state<string>('')
  let accountTypeId = $state<string>('')
  let balance = $state<string>('')
  let bankAgency = $state<string>('')
  let bankAccount = $state<string>('')
  let creditCard = $state<string>('')

  const initState = (account?: Account) => {
    id = account?.id ?? undefined
    active = account?.active ?? false
    name = account?.name ?? ''
    accountTypeId = account?.account_type_id.toString() ?? '0'
    balance = account?.balance.toString() ?? '0'
    bankAgency = account?.bank_branch_id?.toString() ?? ''
    bankAccount = account?.bank_account_number?.toString() ?? ''
    creditCard = account?.credit_card_number?.toString() ?? ''
  }

  const handleOnSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // seguir daqui e montar o payload tipado e carregar o evento de envio para o backend
    const payload: Account = {
      id: Number(id) ?? undefined,
      active: active,
      name: name,
      account_type_id: Number(accountTypeId) ?? undefined,
      balance: Number(balance) ?? 0,
      bank_branch_id: bankAgency,
      bank_account_number: bankAccount,
      credit_card_number: creditCard,
    }

    onSubmitted?.()

    if (id === undefined) {
      createAccount(payload)
        .then(() => {
          toast.success('Conta criada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possivel criar a conta')
        })
    } else {
      updateAccount(payload)
        .then(() => {
          toast.success('Conta atualizada com sucesso')
        })
        .catch(() => {
          toast.error('não foi possível atualizar a conta')
        })
    }
  }

  return {
    initState,
    accountTypesQuery,
    handleOnSubmit,

    get id() {
      return id
    },
    set id(value) {
      id = value
    },
    get active() {
      return active
    },
    set active(value) {
      active = value
    },
    get name() {
      return name
    },
    set name(value) {
      name = value
    },
    get accountTypeId() {
      return accountTypeId
    },
    set accountTypeId(value) {
      accountTypeId = value
    },
    get balance() {
      return balance
    },
    set balance(value) {
      balance = value
    },
    get bankAgency() {
      return bankAgency
    },
    set bankAgency(value) {
      bankAgency = value
    },
    get bankAccount() {
      return bankAccount
    },
    set bankAccount(value) {
      bankAccount = value
    },
    get creditCard() {
      return creditCard
    },
    set creditCard(value) {
      creditCard = value
    },
  }
}

export { createAccountsFormController }
