import type { AuthResponse, AuthUser } from './types'

const TOKEN_KEY = '@finance-token'
const USER_KEY = '@finance-user'
const EXP_KEY = '@finance-exp'

const session = $state<{
  token: string | null
  user: AuthUser | null
}>({
  token: null,
  user: null,
})

const authSession = {
  get token() {
    return session.token
  },

  get user() {
    return session.user
  },

  get isAuthenticated() {
    return session.token !== null
  },

  restore: () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      const user = localStorage.getItem(USER_KEY)

      if (!token || !user) return

      session.token = token
      session.user = JSON.parse(user) as AuthUser
    } catch {
      authSession.logout()
    }
  },

  login: (data: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    localStorage.setItem(EXP_KEY, data.exp)

    session.token = data.token
    session.user = data.user
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(EXP_KEY)

    session.token = null
    session.user = null
  },
}

export { authSession }
