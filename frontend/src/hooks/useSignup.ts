import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../api/postRegister'
import type { SignupRequest } from '../types/auth'

export function useSignup() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: SignupRequest) => postRegister(payload),
    onSuccess: () => {
      navigate('/login')
    },
  })
}
