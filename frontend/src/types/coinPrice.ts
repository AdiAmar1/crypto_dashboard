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
