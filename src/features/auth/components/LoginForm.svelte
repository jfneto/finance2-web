<script lang="ts">
  import AppButton from '@lib/components/ui/buttons/AppButton.svelte'
  import AppCheckbox from '@lib/components/ui/inputs/AppCheckbox.svelte'
  import FloatingField from '@lib/components/ui/inputs/FloatingField.svelte'
  import Brand from '@lib/components/ui/layout/Brand.svelte'
  import { _ } from 'svelte-i18n'
  import LoginCard from './LoginCard.svelte'
  import LoginHeader from './LoginHeader.svelte'
  import LoginMain from './LoginMain.svelte'

  interface Props {
    email: string
    password: string
    emailError: string
    passwordError: string
    generalError: string
    isLoading: boolean
    remember: boolean
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onRememberChange: (value: boolean) => void
    onSubmit: () => void
  }

  let {
    email,
    password,
    emailError,
    passwordError,
    generalError,
    isLoading,
    remember,
    onEmailChange,
    onPasswordChange,
    onRememberChange,
    onSubmit,
  }: Props = $props()
</script>

<LoginMain>
  <LoginCard>
    <Brand text="Finance" />

    <LoginHeader />

    {#if generalError}
      <p class="error-banner" role="alert">{generalError}</p>
    {/if}

    <form
      onsubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      novalidate
    >
      <FloatingField
        id="email"
        label={$_('auth.login.email')}
        type="email"
        placeholder="you@exemplo.com"
        autocomplete="email"
        value={email}
        oninput={(event) => onEmailChange(event.currentTarget.value)}
        invalid={!!emailError}
        error={emailError ? $_('auth.login.invalidEmail') : undefined}
        required
      />

      <FloatingField
        id="password"
        type="password"
        placeholder="sua senha"
        label={$_('auth.login.password')}
        autocomplete="current-password"
        value={password}
        oninput={(event) => onPasswordChange(event.currentTarget.value)}
        invalid={!!passwordError}
        error={passwordError ? 'password-error' : undefined}
        required
      />

      <AppCheckbox
        id="remember"
        label={$_('auth.login.remember')}
        bind:checked={remember}
        onchange={(event) => onRememberChange(event)}
      />

      <AppButton type="submit" fullWidth loading={isLoading} disabled={isLoading} size="lg">
        {isLoading ? $_('auth.login.loading') : $_('auth.login.submit')}
      </AppButton>
    </form>

    <footer>
      <span>Suas finanças, sob controle.</span>
    </footer>
  </LoginCard>
</LoginMain>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  footer {
    color: #a1a1aa;
    font-size: 14px;
    line-height: 1.6;
  }

  .error-banner {
    margin: 0 0 20px;
    padding: 12px;
    border: 1px solid #7f1d1d;
    border-radius: 8px;
    background: #450a0a;
    color: #fecaca;
    font-size: 13px;
    line-height: 1.5;
  }

  footer {
    margin-top: 28px;
    text-align: center;
  }
</style>
