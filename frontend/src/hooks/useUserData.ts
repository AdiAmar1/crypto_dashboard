import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../api/getUserData'

export const userDataQueryKey = ['userData'] as const

export function useUserData() {
  return useQuery({
    queryKey: userDataQueryKey,
    queryFn: getUserData,
  })
}
