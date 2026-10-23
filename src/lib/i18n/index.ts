import { addMessages, init } from 'svelte-i18n'
import { enUS } from './locales/en-US'
import { ptBR } from './locales/pt-BR'

addMessages('pt-BR', ptBR)
addMessages('en-US', enUS)

init({
  fallbackLocale: 'pt-BR',
  initialLocale: 'pt-BR',
})
