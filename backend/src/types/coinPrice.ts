export interface CoinPrice {
  id: string
  symbol: string
  name: string
  image: string
  currentPrice: number
  priceChangePercentage24h: number | null
  marketCap: number
}

export interface CoinPricesResult {
  snapshotId: string
  coins: CoinPrice[]
}

export interface CoingeckoMarketRow {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number | null
  market_cap: number
}

export function mapCoingeckoMarket(row: CoingeckoMarketRow): CoinPrice {
  return {
    id: row.id,
    symbol: row.symbol,
    name: row.name,
    image: row.image,
    currentPrice: row.current_price,
    priceChangePercentage24h: row.price_change_percentage_24h,
    marketCap: row.market_cap,
  }
}
