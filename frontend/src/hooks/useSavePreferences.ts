import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { putSavePreferences } from '../api/putSavePreferences'
import type { UserPreferences } from '../types/user'
import { userDataQueryKey } from './useUserData'

export function useSavePreferences() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (preferences: UserPreferences) =>
      putSavePreferences({ preferences }),
    onSuccess: (user) => {
      queryClient.setQueryData(userDataQueryKey, user)
      navigate('/', { replace: true })
    },
  })
}
