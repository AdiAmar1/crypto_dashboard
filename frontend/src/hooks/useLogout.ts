import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { postLogout } from '../api/postLogout'
import { userDataQueryKey } from './useUserData'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userDataQueryKey })
      navigate('/login', { replace: true })
    },
  })
}
