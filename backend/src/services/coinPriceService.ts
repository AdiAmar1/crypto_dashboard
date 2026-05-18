import {
  COINGECKO_BASE_URL,
  getCoingeckoHeaders,
} from '../config/coingecko.js'
import {
  mapCoingeckoMarket,
  type CoinPrice,
  type CoingeckoMarketRow,
} from '../types/coinPrice.js'
import { createTtlCache } from '../utils/cache.js'

const CACHE_TTL_MS = 60_000
const coinPricesCache = createTtlCache<CoinPrice[]>(CACHE_TTL_MS)

function cacheKey(coinIds: string[]): string {
  return [...coinIds].sort().join(',')
}

export async function getCoinPrices(coinIds: string[]): Promise<CoinPrice[]> {
  if (coinIds.length === 0) {
    return []
  }

  const key = cacheKey(coinIds)
  const cached = coinPricesCache.get(key)
  if (cached) {
    return cached
  }

  const params = new URLSearchParams({
    vs_currency: 'usd',
    ids: coinIds.join(','),
    sparkline: 'false',
  })

  const url = `${COINGECKO_BASE_URL}/coins/markets?${params.toString()}`

  const response = await fetch(url, {
    headers: getCoingeckoHeaders(),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(
      `CoinGecko request failed (${response.status}): ${message || response.statusText}`,
    )
  }

  const data = (await response.json()) as CoingeckoMarketRow[]

  const coins = data.map(mapCoingeckoMarket)
  coinPricesCache.set(key, coins)
  return coins
}
