import { authSession } from '@lib/auth/session.svelte'
import { mount } from 'svelte'
import App from './App.svelte'
import '@styles/global.css'
import '@lib/styles/tokens.css'
import '@lib/i18n'
import { setupInterceptors } from '@app/api'

authSession.restore()

// inicializa o interceptador para garantir que vai ter o token e logout antes de tentar executar as consultas
setupInterceptors(
  () => authSession.token,
  () => authSession.logout(),
)

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
