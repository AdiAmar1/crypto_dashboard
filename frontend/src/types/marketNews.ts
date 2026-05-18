export type MarketNewsArticle = {
  id: string
  title: string
  link: string
  description: string | null
  imageUrl: string | null
  sourceName: string | null
  publishedAt: string
}

export type MarketNewsResult = {
  totalResults: number
  articles: MarketNewsArticle[]
  nextPage: string | null
}
