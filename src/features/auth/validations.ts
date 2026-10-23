interface LoginValidation {
  emailError: string
  passwordError: string
}

const validateLogin = (email: string, password: string): LoginValidation => {
  const emailError = !email.trim() || !/^\S+@\S+\.\S+$/.test(email) ? 'Informe um e-mail válido.' : ''

  const passwordError = !password || password.length < 6 ? 'A senha deve ter pelo menos 6 caracteres.' : ''

  return { emailError, passwordError }
}

export type { LoginValidation }
export { validateLogin }
