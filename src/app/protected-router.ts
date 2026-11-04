import AccountTypesPage from '@features/account-types/AccountTypesPage.svelte'
import AccountsPage from '@features/accounts/AccountsPage.svelte'
import CategoriesPage from '@features/categories/CategoriesPage.svelte'
import Dashboard from '@features/dashboard/pages/Dashboard.svelte'
import ImporterPage from '@features/importer/ImporterPage.svelte'
import CreditcardPage from '@features/moviments/CreditcardPage.svelte'
import MovimentPage from '@features/moviments/MovimentPage.svelte'
import PaymentFormsPage from '@features/payment-forms/PaymentFormsPage.svelte'
import PeoplePage from '@features/people/PeoplePage.svelte'
import PeriodPage from '@features/periods/PeriodPage.svelte'
import type { RouteConfig } from '@mateothegreat/svelte5-router'
import { StaticRoutes } from './static-routes'

const protectedRoutes: RouteConfig[] = [
  {
    path: StaticRoutes.dashboard,
    component: Dashboard,
  },
  {
    path: StaticRoutes.accountTypes,
    component: AccountTypesPage,
  },
  {
    path: StaticRoutes.accounts,
    component: AccountsPage,
  },
  {
    path: StaticRoutes.categories,
    component: CategoriesPage,
  },
  {
    path: StaticRoutes.paymentForms,
    component: PaymentFormsPage,
  },
  {
    path: StaticRoutes.people,
    component: PeoplePage,
  },
  {
    path: StaticRoutes.periods,
    component: PeriodPage,
  },
  {
    path: StaticRoutes.moviments,
    component: MovimentPage,
  },
  {
    path: StaticRoutes.creditcards,
    component: CreditcardPage,
  },
  {
    path: StaticRoutes.importer,
    component: ImporterPage,
  },
]

export { protectedRoutes }
