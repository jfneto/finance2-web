import { authSession } from '@lib/auth/session.svelte'
import { goto, type RouteResult } from '@mateothegreat/svelte5-router'

const authGuard = async (_route: RouteResult): Promise<boolean> => {
  const publicRoutes = ['/', '/login']
  const currentPath = window.location.pathname

  if (publicRoutes.includes(currentPath)) {
    return true
  }

  if (!authSession.isAuthenticated) {
    console.log(authSession.isAuthenticated)
    // goto('/login')
    return false
  }

  return true
}

export { authGuard }
