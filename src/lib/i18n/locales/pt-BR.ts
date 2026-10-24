import { account } from './pt-BR/account'
import { accountType } from './pt-BR/accountType'
import { app } from './pt-BR/app'
import { login } from './pt-BR/login'

const ptBR = { ...app, ...login, ...accountType, ...account } as const

export { ptBR }
