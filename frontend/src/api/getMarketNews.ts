import { fetchApi } from './fetchApi'
import type { MarketNewsResult } from '../types/marketNews'

export async function getMarketNews(coins: string[]): Promise<MarketNewsResult> {
  const q = coins.join(',')
  const response = await fetchApi(
    `http://localhost:3000/api/news/crypto?q=${encodeURIComponent(q)}`,
  )

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(body?.error ?? 'Failed to fetch market news')
  }

  return response.json() as Promise<MarketNewsResult>
}
