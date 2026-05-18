import type { WidgetPreference } from '../types/widgetPreference'

export async function getUserPreferences(): Promise<WidgetPreference[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return ['MARKET_NEWS', 'COIN_PRICES', 'DAILY_INSIGHTS', 'FUN_MEME']
}
