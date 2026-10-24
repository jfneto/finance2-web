import LoginPage from '@features/auth/LoginPage.svelte'
import type { RouteConfig } from '@mateothegreat/svelte5-router'
import MainLayout from '../layouts/MainLayout.svelte'

const routes: RouteConfig[] = [
  { path: '/login', component: LoginPage },
  { path: '/(.*?)', component: MainLayout },
]

export { routes }
