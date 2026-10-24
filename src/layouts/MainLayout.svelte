<script lang="ts">
  import { protectedRoutes } from '@app/protected-router'
  import logo from '@assets/finance-logo.svg'
  import AppDrawer from '@lib/components/ui/layout/AppDrawer.svelte'
  import AppNavbar from '@lib/components/ui/layout/AppNavbar.svelte'
  import { Landmark, LayoutDashboard, WalletCards } from '@lucide/svelte'
  import { Router } from '@mateothegreat/svelte5-router'

  let collapsed = $state(false)
  let activePath = $state(typeof window !== 'undefined' ? window.location.pathname : '/dashboard')
</script>

{#snippet drawerFooter()}
  <div class="user-info">
    <button type="button">Sair</button>
  </div>
{/snippet}

{#snippet drawerLogo()}
  <img src={logo} alt="Finance" class="logo-image">
{/snippet}

<div class="app-layout">
  <AppDrawer
    logo={drawerLogo}
    items={[
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Tipo de Conta', href: '/account-types', icon: WalletCards },
      { label: 'Contas bancárias', href: '/accounts', icon: Landmark },
    ]}
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
