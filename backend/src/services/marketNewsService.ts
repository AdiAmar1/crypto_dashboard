import { NEWSDATA_API_KEY, NEWSDATA_BASE_URL } from '../config/newsdata.js'
import {
  mapNewsdataArticle,
  type MarketNewsArticle,
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

function dedupeArticles(articles: MarketNewsArticle[]): MarketNewsArticle[] {
  const seen = new Set<string>()
  return articles.filter((article) => {
    if (seen.has(article.id)) {
      return false
    }
    seen.add(article.id)
    return true
  })
}

function uniqueCoinQueries(coins: string[]): { rawQuery: string; symbol: string }[] {
  const seenSymbols = new Set<string>()
  const result: { rawQuery: string; symbol: string }[] = []

  for (const coin of coins) {
    const rawQuery = coin.trim()
    if (!rawQuery) {
      continue
    }
    const symbol = resolveCoinSymbol(rawQuery)
    if (seenSymbols.has(symbol)) {
      continue
    }
    seenSymbols.add(symbol)
    result.push({ rawQuery, symbol })
  }

  return result
}

async function fetchMarketNewsForCoin(
  rawQuery: string,
  symbol: string,
): Promise<MarketNewsResult> {
  const key = symbol
  const cached = marketNewsCache.get(key)
  if (cached) {
    return cached
  }

  const searchTerms = coinSearchTerms(rawQuery, symbol)
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

export async function getMarketNews(
  query: MarketNewsQuery,
): Promise<MarketNewsResult> {
  const coinQueries = uniqueCoinQueries(query.coins)

  if (coinQueries.length === 0) {
    return {
      totalResults: 0,
      articles: [],
      nextPage: null,
    }
  }

  const results = await Promise.all(
    coinQueries.map(({ rawQuery, symbol }) =>
      fetchMarketNewsForCoin(rawQuery, symbol),
    ),
  )

  const articles = dedupeArticles(results.flatMap((result) => result.articles))

  return {
    totalResults: articles.length,
    articles,
    nextPage: null,
  }
}
