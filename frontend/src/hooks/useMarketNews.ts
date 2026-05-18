import { useQuery } from '@tanstack/react-query'
import { getMarketNews } from '../api/getMarketNews'

export const marketNewsQueryKey = ['marketNews'] as const

const STALE_TIME_MS = 60_000

export function useMarketNews(coins: string[]) {
  return useQuery({
    queryKey: [...marketNewsQueryKey, coins],
    queryFn: async () => {
      const result = await getMarketNews(coins)
      return result.articles
    },
    enabled: coins.length > 0,
    staleTime: STALE_TIME_MS,
    refetchInterval: STALE_TIME_MS,
  })
}
