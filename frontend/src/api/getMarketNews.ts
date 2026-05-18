import type { MarketNewsResult } from '../types/marketNews'

export async function getMarketNews(coin: string): Promise<MarketNewsResult> {
  const response = await fetch(
    `http://localhost:3000/api/news/crypto?q=${encodeURIComponent(coin)}`,
  )

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(body?.error ?? 'Failed to fetch market news')
  }

  return response.json() as Promise<MarketNewsResult>
}
