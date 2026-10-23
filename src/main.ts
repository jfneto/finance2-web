import { authSession } from '@lib/auth/session.svelte'
import { mount } from 'svelte'
import App from './App.svelte'
import '@styles/global.css'
import '@lib/styles/tokens.css'
import '@lib/i18n'

authSession.restore()

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
