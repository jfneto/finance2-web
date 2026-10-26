import { account } from './pt-BR/account'
import { accountType } from './pt-BR/accountType'
import { app } from './pt-BR/app'
import { category } from './pt-BR/category'
import { login } from './pt-BR/login'
import { paymentForm } from './pt-BR/paymentForm'

const ptBR = { ...app, ...login, ...accountType, ...account, ...category, ...paymentForm } as const

export { ptBR }
