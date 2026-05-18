import { useQuery } from '@tanstack/react-query'
import { getFunMeme } from '../api/getFunMeme'

export const funMemeQueryKey = ['funMeme'] as const

const STALE_TIME_MS = 5 * 60_000

export function useFunMeme() {
  return useQuery({
    queryKey: funMemeQueryKey,
    queryFn: getFunMeme,
    staleTime: STALE_TIME_MS,
  })
}
