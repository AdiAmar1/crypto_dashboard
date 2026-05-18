import {
  COINGECKO_BASE_URL,
  getCoingeckoHeaders,
} from '../config/coingecko.js'
import {
  mapCoingeckoMarket,
  type CoinPrice,
  type CoingeckoMarketRow,
} from '../types/coinPrice.js'

const DEFAULT_PER_PAGE = 10

export async function getCoinPrices(perPage = DEFAULT_PER_PAGE): Promise<CoinPrice[]> {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: String(perPage),
    page: '1',
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

  return data.map(mapCoingeckoMarket)
}
