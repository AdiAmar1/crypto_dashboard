const COINGECKO_ID_TO_SYMBOL: Record<string, string> = {
  bitcoin: 'btc',
  ethereum: 'eth',
  tether: 'usdt',
  binancecoin: 'bnb',
  solana: 'sol',
  ripple: 'xrp',
  cardano: 'ada',
  dogecoin: 'doge',
  tron: 'trx',
  polkadot: 'dot',
  litecoin: 'ltc',
  'avalanche-2': 'avax',
  chainlink: 'link',
  stellar: 'xlm',
  monero: 'xmr',
  uniswap: 'uni',
  cosmos: 'atom',
  'near': 'near',
  'internet-computer': 'icp',
  aptos: 'apt',
  arbitrum: 'arb',
  optimism: 'op',
  sui: 'sui',
  pepe: 'pepe',
  'shiba-inu': 'shib',
}

export function resolveCoinSymbol(query: string): string {
  const normalized = query.trim().toLowerCase()

  const mapped = COINGECKO_ID_TO_SYMBOL[normalized]
  if (mapped) {
    return mapped
  }

  if (/^[a-z0-9]{2,10}$/.test(normalized)) {
    return normalized
  }

  return normalized.replace(/[^a-z0-9]/g, '').slice(0, 10)
}

export function coinSearchTerms(query: string, symbol: string): string[] {
  const normalized = query.trim().toLowerCase()
  const terms = new Set<string>([symbol.toLowerCase(), symbol.toUpperCase()])

  if (normalized !== symbol.toLowerCase()) {
    terms.add(normalized)
  }

  return [...terms]
}
