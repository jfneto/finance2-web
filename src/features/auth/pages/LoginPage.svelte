<script lang="ts">
  import SvelteHeader from '@lib/components/ui/layout/SvelteHeader.svelte'
  import { _ } from 'svelte-i18n'
  import LoginForm from '../components/LoginForm.svelte'
  import { createLoginController } from '../login-controller.svelte'

  const login = createLoginController()

  const handleSubmit = async (): Promise<void> => {
    const authenticated = await login.submit()

    console.log(authenticated)

    if (authenticated) {
      window.location.assign('/dashboard')
    }
  }
</script>

<SvelteHeader
  title={`${$_('app.name')} | ${$_('auth.login.submit')}`}
  name="description"
  content={$_('auth.login.subtitle')}
/>

<LoginForm
  email={login.email}
  password={login.password}
  emailError={login.emailError}
  passwordError={login.passwordError}
  generalError={login.generalError}
  isLoading={login.isLoading}
  remember={login.remember}
  onEmailChange={(value) => (login.email = value)}
  onPasswordChange={(value) => (login.password = value)}
  onRememberChange={(value) => (login.remember = value)}
  onSubmit={handleSubmit}
/>
