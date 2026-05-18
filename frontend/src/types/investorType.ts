export const INVESTOR_TYPES = [
  'hodler',
  'day_trader',
  'nft_collector',
] as const

export type InvestorType = (typeof INVESTOR_TYPES)[number]
