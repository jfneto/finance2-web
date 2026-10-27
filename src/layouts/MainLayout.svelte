<script lang="ts">
  import { protectedRoutes } from '@app/protected-router'
  import { StaticRoutes } from '@app/static-routes'
  import logo from '@assets/finance-logo.svg'
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppDrawer from '@lib/components/ui/layout/AppDrawer/AppDrawer.svelte'
  import type { MenuItem } from '@lib/components/ui/layout/AppDrawer/MenuItem'
  import AppNavbar from '@lib/components/ui/layout/AppNavbar.svelte'
  import {
    Calendar,
    CreditCardReader,
    Landmark,
    LayoutDashboard,
    ListSortDescending,
    LogOut,
    SquareActivity,
    UserGroup,
    WalletCards,
  } from '@lucide/svelte'
  import { Router } from '@mateothegreat/svelte5-router'
  import { _ } from 'svelte-i18n'

  let collapsed = $state(false)
  let activePath = $state(typeof window !== 'undefined' ? window.location.pathname : StaticRoutes.dashboard)

  const fixed: MenuItem[] = [{ label: $_('menus.dashboard'), href: StaticRoutes.dashboard, icon: LayoutDashboard }]

  const registration: MenuItem[] = [
    {
      label: $_('menus.accountType'),
      href: StaticRoutes.accountTypes,
      icon: WalletCards,
      group: $_('menus.groups.registration'),
    },
    {
      label: $_('menus.account'),
      href: StaticRoutes.accounts,
      icon: Landmark,
      group: $_('menus.groups.registration'),
    },
    {
      label: $_('menus.categories'),
      href: StaticRoutes.categories,
      icon: ListSortDescending,
      group: $_('menus.groups.registration'),
    },
    {
      label: $_('menus.paymentForms'),
      href: StaticRoutes.paymentForms,
      icon: CreditCardReader,
      group: $_('menus.groups.registration'),
    },
    {
      label: $_('menus.periods'),
      href: StaticRoutes.periods,
      icon: Calendar,
      group: $_('menus.groups.registration'),
    },
    {
      label: $_('menus.people'),
      href: StaticRoutes.people,
      icon: UserGroup,
      group: $_('menus.groups.registration'),
    },
  ]

  const routines: MenuItem[] = [
    {
      label: $_('menus.moviments'),
      href: StaticRoutes.moviments,
      icon: SquareActivity,
      group: $_('menus.groups.routines'),
    },
  ]

  const items: MenuItem[] = [...fixed, ...registration, ...routines]

  console.log(items)
</script>

{#snippet drawerFooter()}
  <div class="user-info">
    <AppButton variant="ghost" onclick={() => console.log('Sair')} fullWidth={true}><LogOut /></AppButton>
  </div>
{/snippet}

{#snippet drawerLogo()}
  <img src={logo} alt="Finance" class="logo-image">
{/snippet}

<div class="app-layout">
  <AppDrawer
    logo={drawerLogo}
    {items}
    bind:collapsed
    {activePath}
    onNavigate={(href) => {
      window.history.pushState({}, '', href)
      activePath = href
      window.dispatchEvent(new PopStateEvent('popstate'))
    }}
    footer={drawerFooter}
  />

  <main class="content">
    <AppNavbar />
    <Router routes={protectedRoutes} basePath="/" />
  </main>
</div>

<style>
  .app-layout {
    display: flex;
    width: 100%;
    min-height: 100dvh;
    background: var(--color-background);
    color: var(--color-text);
  }

  .content {
    flex: 1;
    min-width: 0;
    min-height: 100dvh;
    overflow: auto;
  }

  .logo-image {
    display: block;
    width: 160px;
    max-width: 100%;
    height: auto;
  }
</style>
