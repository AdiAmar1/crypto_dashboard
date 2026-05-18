export interface MarketNewsArticle {
  id: string
  title: string
  link: string
  description: string | null
  imageUrl: string | null
  sourceName: string | null
  publishedAt: string
}

export interface MarketNewsResult {
  totalResults: number
  articles: MarketNewsArticle[]
  nextPage: string | null
}

export interface NewsdataMarketArticle {
  article_id: string
  title: string
  link: string
  description?: string | null
  image_url?: string | null
  source_name?: string | null
  pubDate: string
  coin?: string[]
}

export interface NewsdataMarketResponse {
  status: string
  totalResults?: number
  results?: NewsdataMarketArticle[]
  nextPage?: string | null
  message?: string
  code?: string
}

export interface MarketNewsQuery {
  q: string
}

export function mapNewsdataArticle(
  article: NewsdataMarketArticle,
): MarketNewsArticle {
  return {
    id: article.article_id,
    title: article.title,
    link: article.link,
    description: article.description ?? null,
    imageUrl: article.image_url ?? null,
    sourceName: article.source_name ?? null,
    publishedAt: article.pubDate,
  }
}
