import {
  COINGECKO_BASE_URL,
  getCoingeckoHeaders,
} from '../config/coingecko.js'
import {
  mapCoingeckoMarket,
  type CoinPricesResult,
  type CoingeckoMarketRow,
} from '../types/coinPrice.js'
import { createTtlCache } from '../utils/cache.js'

const CACHE_TTL_MS = 60_0000
const coinPricesCache = createTtlCache<CoinPricesResult['coins']>(CACHE_TTL_MS)

function cacheKey(coinIds: string[]): string {
  return [...coinIds].sort().join(',')
}

export async function getCoinPrices(
  coinIds: string[],
): Promise<CoinPricesResult> {
  if (coinIds.length === 0) {
    return { snapshotId: '', coins: [] }
  }

  const key = cacheKey(coinIds)
  const cached = coinPricesCache.get(key)
  if (cached) {
    return { coins: cached.value, snapshotId: cached.snapshotId }
  }

  const params = new URLSearchParams({
    vs_currency: 'usd',
    symbols: coinIds.join(','),
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
  const snapshotId = coinPricesCache.set(key, coins)
  return { snapshotId, coins }
}
