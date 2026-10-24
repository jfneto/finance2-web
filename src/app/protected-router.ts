import AccountTypesPage from '@features/account-types/AccountTypesPage.svelte'
import Dashboard from '@features/dashboard/pages/Dashboard.svelte'

import type { RouteConfig } from '@mateothegreat/svelte5-router'

const protectedRoutes: RouteConfig[] = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: 'account-types',
    component: AccountTypesPage,
  },
]

export { protectedRoutes }
