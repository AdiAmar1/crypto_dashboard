import { useQuery } from '@tanstack/react-query'
import { getDailyInsights } from '../api/getDailyInsights'

export const dailyInsightsQueryKey = ['dailyInsights'] as const

const STALE_TIME_MS = 30 * 60_000

export function useDailyInsights(coins: string[]) {
  return useQuery({
    queryKey: [...dailyInsightsQueryKey, coins],
    queryFn: () => getDailyInsights(coins),
    enabled: coins.length > 0,
    staleTime: STALE_TIME_MS,
  })
}
