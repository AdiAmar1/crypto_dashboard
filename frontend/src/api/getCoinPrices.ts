import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { CoinPricesResult } from '../types/coinPrice'

export async function getCoinPrices(
  coins: string[],
): Promise<CoinPricesResult> {
  const ids = coins.join(',')
  const response = await fetchApi(
    `${API_BASE_URL}/api/coins/prices?ids=${encodeURIComponent(ids)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch coin prices')
  }

  return response.json() as Promise<CoinPricesResult>
}
