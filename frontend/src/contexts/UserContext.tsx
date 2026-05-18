import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUserData, userDataQueryKey } from '../hooks/useUserData'
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
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logout = useCallback(() => {
    queryClient.removeQueries({ queryKey: userDataQueryKey })
    navigate('/login')
  }, [queryClient, navigate])

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
