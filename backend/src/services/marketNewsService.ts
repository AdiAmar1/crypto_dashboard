import { NEWSDATA_API_KEY, NEWSDATA_BASE_URL } from '../config/newsdata.js'
import {
  mapNewsdataArticle,
  type MarketNewsQuery,
  type MarketNewsResult,
  type NewsdataMarketArticle,
  type NewsdataMarketResponse,
} from '../types/marketNews.js'
import { createTtlCache } from '../utils/cache.js'
import {
  coinSearchTerms,
  resolveCoinSymbol,
} from '../utils/resolveCoinSymbol.js'

const CACHE_TTL_MS = 60_000
const marketNewsCache = createTtlCache<MarketNewsResult>(CACHE_TTL_MS)

function articleMatchesCoin(
  article: NewsdataMarketArticle,
  symbol: string,
  searchTerms: string[],
): boolean {
  const targetSymbol = symbol.toUpperCase()
  const taggedCoins = (article.coin ?? []).map((coin) => coin.toUpperCase())
  if (taggedCoins.includes(targetSymbol)) {
    return true
  }

  const text = `${article.title} ${article.description ?? ''}`.toLowerCase()
  return searchTerms.some((term) => text.includes(term.toLowerCase()))
}

export async function getMarketNews(
  query: MarketNewsQuery,
): Promise<MarketNewsResult> {
  const symbol = resolveCoinSymbol(query.q)
  const key = symbol
  const cached = marketNewsCache.get(key)
  if (cached) {
    return cached
  }

  const searchTerms = coinSearchTerms(query.q, symbol)
  const params = new URLSearchParams({
    apikey: NEWSDATA_API_KEY,
    coin: symbol,
    language: 'en',
    size: '10',
  })
  const url = `${NEWSDATA_BASE_URL}/crypto?${params.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(
      `NewsData.io request failed (${response.status}): ${message || response.statusText}`,
    )
  }

  const data = (await response.json()) as NewsdataMarketResponse

  if (data.status !== 'success') {
    throw new Error(data.message ?? 'NewsData.io returned an error')
  }

  const articles = (data.results ?? [])
    .filter((article) => articleMatchesCoin(article, symbol, searchTerms))
    .slice(0, 4)
    .map(mapNewsdataArticle)
  const result: MarketNewsResult = {
    totalResults: articles.length,
    articles,
    nextPage: null,
  }

  marketNewsCache.set(key, result)
  return result
}
