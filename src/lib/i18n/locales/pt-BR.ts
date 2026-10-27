import { account } from './pt-BR/account'
import { accountType } from './pt-BR/accountType'
import { app } from './pt-BR/app'
import { category } from './pt-BR/category'
import { login } from './pt-BR/login'
import { menu } from './pt-BR/menu'
import { paymentForm } from './pt-BR/paymentForm'
import { period } from './pt-BR/period'
import { person } from './pt-BR/person'

const ptBR = {
  ...app,
  ...login,
  ...accountType,
  ...account,
  ...category,
  ...paymentForm,
  ...menu,
  ...person,
  ...period,
} as const

export { ptBR }
