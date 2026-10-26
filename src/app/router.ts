import LoginPage from '@features/auth/LoginPage.svelte'
import type { RouteConfig } from '@mateothegreat/svelte5-router'
import MainLayout from '../layouts/MainLayout.svelte'

const routes: RouteConfig[] = [
  // o redirecionamento de '/' é feito no authGuard (hooks por rota são sobrescritos pelos globais na lib)
  { path: '/', component: LoginPage },
  // a lib usa o ÚLTIMO match, então o catch-all deve vir antes das rotas específicas
  { path: '/(.*?)', component: MainLayout },
  { path: '/login', component: LoginPage },
]

export { routes }
