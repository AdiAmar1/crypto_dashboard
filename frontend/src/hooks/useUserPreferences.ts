import { useQuery } from '@tanstack/react-query'
import { getUserPreferences } from '../api/getUserPreferences'

export const userPreferencesQueryKey = ['userPreferences'] as const

export function useUserPreferences() {
  return useQuery({
    queryKey: userPreferencesQueryKey,
    queryFn: getUserPreferences,
  })
}
