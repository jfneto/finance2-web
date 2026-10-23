import LoginPage from '@features/auth/pages/LoginPage.svelte'
import Dashboard from '@features/dashboard/pages/Dashboard.svelte'
import type { RouteConfig } from '@mateothegreat/svelte5-router'

const routes: RouteConfig[] = [
  { path: '/', component: LoginPage },
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: Dashboard },
]

export { routes }
