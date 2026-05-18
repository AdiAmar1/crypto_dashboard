import type { CoinPrice } from '../types/coinPrice'

export async function getCoinPrices(coins: string[]): Promise<CoinPrice[]> {
  const ids = coins.join(',')
  const response = await fetch(
    `http://localhost:3000/api/coins/prices?ids=${encodeURIComponent(ids)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch coin prices')
  }

  return response.json() as Promise<CoinPrice[]>
}
