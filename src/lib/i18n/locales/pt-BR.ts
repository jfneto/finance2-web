import { account } from './pt-BR/account'
import { accountType } from './pt-BR/accountType'
import { app } from './pt-BR/app'
import { category } from './pt-BR/category'
import { login } from './pt-BR/login'

const ptBR = { ...app, ...login, ...accountType, ...account, ...category } as const

export { ptBR }
