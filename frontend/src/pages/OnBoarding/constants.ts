import type { InvestorType } from '../../types/investorType'
import type { WidgetPreference } from '../../types/widgetPreference'

/** First seven entries in backend COINGECKO_ID_TO_SYMBOL (most popular). */
export const POPULAR_COINS = [
  { symbol: 'btc', name: 'Bitcoin' },
  { symbol: 'eth', name: 'Ethereum' },
  { symbol: 'usdt', name: 'Tether' },
  { symbol: 'bnb', name: 'BNB' },
  { symbol: 'sol', name: 'Solana' },
  { symbol: 'xrp', name: 'XRP' },
  { symbol: 'ada', name: 'Cardano' },
] as const

export const INVESTOR_TYPES = [
  {
    id: 'hodler',
    label: 'HODLer',
    description: 'Long-term holds and steady portfolio growth.',
  },
  {
    id: 'day_trader',
    label: 'Day Trader',
    description: 'Active moves, charts, and short-term opportunities.',
  },
  {
    id: 'nft_collector',
    label: 'NFT Collector',
    description: 'Culture, collectibles, and on-chain communities.',
  },
] as const

export type { InvestorType }

export const CONTENT_OPTIONS: {
  id: WidgetPreference
  label: string
  description: string
}[] = [
  {
    id: 'MARKET_NEWS',
    label: 'Market News',
    description: 'Headlines and stories for your watchlist.',
  },
  {
    id: 'COIN_PRICES',
    label: 'Charts',
    description: 'Live prices and price charts.',
  },
  {
    id: 'DAILY_INSIGHTS',
    label: 'Daily Insights',
    description: 'Curated takeaways to start your day.',
  },
  {
    id: 'FUN_MEME',
    label: 'Fun',
    description: 'Lighthearted crypto memes and moments.',
  },
]

export const ONBOARDING_STEPS = [
  'What crypto assets are you interested in?',
  'What type of investor are you?',
  'What kind of content would you like to see?',
] as const
