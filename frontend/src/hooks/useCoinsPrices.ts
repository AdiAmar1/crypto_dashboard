import { useQuery } from '@tanstack/react-query'
import { getCoinPrices } from '../api/getCoinPrices'

export const coinPricesQueryKey = ['coinPrices'] as const

const STALE_TIME_MS = 60_000

export function useCoinsPrices(coins: string[]) {
  return useQuery({
    queryKey: [...coinPricesQueryKey, coins],
    queryFn: () => getCoinPrices(coins),
    enabled: coins.length > 0,
    staleTime: STALE_TIME_MS,
    refetchInterval: STALE_TIME_MS,
    retry: false,
  })
}
