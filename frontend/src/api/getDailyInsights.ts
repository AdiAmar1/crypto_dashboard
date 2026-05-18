import type { DailyInsightsResult } from '../types/dailyInsights'

export async function getDailyInsights(
  coins: string[],
): Promise<DailyInsightsResult> {
  const ids = coins.join(',')
  const response = await fetch(
    `http://localhost:3000/api/insights?coins=${encodeURIComponent(ids)}`,
  )

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(body?.error ?? 'Failed to fetch daily insights')
  }

  return response.json() as Promise<DailyInsightsResult>
}
