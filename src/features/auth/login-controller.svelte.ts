import { authenticate } from '@lib/auth/api'
import { authSession } from '@lib/auth/session.svelte'
import { validateLogin } from './validations'

const createLoginController = () => {
  let email = $state('')
  let password = $state('')
  let emailError = $state('')
  let passwordError = $state('')
  let generalError = $state('')
  let isLoading = $state(false)
  let remember = $state(true)

  const submit = async (): Promise<boolean> => {
    generalError = ''

    const validation = validateLogin(email, password)
    emailError = validation.emailError
    passwordError = validation.passwordError

    if (emailError || passwordError) {
      return false
    }

    isLoading = true

    try {
      const data = await authenticate(email.trim(), password)
      authSession.login(data)

      return true
    } catch (error) {
      generalError = error instanceof Error ? error.message : 'Não foi possível realizar o login.'

      return false
    } finally {
      isLoading = false
    }
  }

  return {
    get email() {
      return email
    },
    set email(value: string) {
      email = value
    },
    get password() {
      return password
    },
    set password(value: string) {
      password = value
    },
    get emailError() {
      return emailError
    },
    get passwordError() {
      return passwordError
    },
    get generalError() {
      return generalError
    },
    get isLoading() {
      return isLoading
    },
    get remember() {
      return remember
    },
    set remember(value: boolean) {
      remember = value
    },
    submit,
  }
}

export { createLoginController }
