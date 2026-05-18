import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { postLogin } from '../api/postLogin'
import type { LoginRequest } from '../types/auth'
import { userDataQueryKey } from './useUserData'

export function useLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginRequest) => postLogin(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(userDataQueryKey, user)
      const from =
        (location.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? '/'
      navigate(from, { replace: true })
    },
  })
}
