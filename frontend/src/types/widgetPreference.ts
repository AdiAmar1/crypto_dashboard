export const WIDGET_PREFERENCES = [
  'MARKET_NEWS',
  'COIN_PRICES',
  'DAILY_INSIGHTS',
  'FUN_MEME',
] as const

export type WidgetPreference = (typeof WIDGET_PREFERENCES)[number]
