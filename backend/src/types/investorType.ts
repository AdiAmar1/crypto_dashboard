export const INVESTOR_TYPES = [
  'hodler',
  'day_trader',
  'nft_collector',
] as const

export type InvestorType = (typeof INVESTOR_TYPES)[number]

export function isInvestorType(value: unknown): value is InvestorType {
  return (
    typeof value === 'string' &&
    (INVESTOR_TYPES as readonly string[]).includes(value)
  )
}
