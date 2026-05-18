import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../api/getUserData'

export const userDataQueryKey = ['userData'] as const

const STALE_TIME_MS = 5 * 60_000

export function useUserData() {
  return useQuery({
    queryKey: userDataQueryKey,
    queryFn: getUserData,
    staleTime: STALE_TIME_MS,
  })
}
