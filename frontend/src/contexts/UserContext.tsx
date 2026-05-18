import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from 'react'
import { useLogout } from '../hooks/useLogout'
import { useUserData } from '../hooks/useUserData'
import type { User } from '../types/user'

type UserContextValue = {
  user: User | undefined
  isLoading: boolean
  isError: boolean
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError } = useUserData()
  const logoutMutation = useLogout()

  const logout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  return (
    <UserContext.Provider value={{ user, isLoading, isError, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
