import { accountType } from './pt-BR/accountType'
import { app } from './pt-BR/app'
import { login } from './pt-BR/login'

const ptBR = { ...app, ...login, ...accountType } as const

export { ptBR }
