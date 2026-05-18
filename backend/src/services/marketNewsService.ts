import { NEWSDATA_API_KEY, NEWSDATA_BASE_URL } from '../config/newsdata.js'
import {
  mapNewsdataArticle,
  type MarketNewsArticle,
  type MarketNewsQuery,
  type MarketNewsResult,
  type NewsdataMarketArticle,
  type NewsdataMarketResponse,
} from '../types/marketNews.js'
import { createTtlCache, DEFAULT_CACHE_TTL_MS } from '../utils/cache.js'
import {
  coinSearchTerms,
  resolveCoinSymbol,
} from '../utils/resolveCoinSymbol.js'

const marketNewsCache = createTtlCache<
  Omit<MarketNewsResult, 'snapshotId'>
>(DEFAULT_CACHE_TTL_MS)

function cacheKey(symbols: string[]): string {
  return [...symbols].sort().join(',')
}

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
): Promise<MarketNewsArticle[]> {
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

  return (data.results ?? [])
    .filter((article) => articleMatchesCoin(article, symbol, searchTerms))
    .slice(0, 4)
    .map(mapNewsdataArticle)
}

export async function getMarketNews(
  query: MarketNewsQuery,
): Promise<MarketNewsResult> {
  const coinQueries = uniqueCoinQueries(query.coins)

  if (coinQueries.length === 0) {
    const emptyKey = ''
    const cachedEmpty = marketNewsCache.get(emptyKey)
    if (cachedEmpty) {
      return { ...cachedEmpty.value, snapshotId: cachedEmpty.snapshotId }
    }
    const emptyPayload = {
      totalResults: 0,
      articles: [],
      nextPage: null,
    }
    const snapshotId = marketNewsCache.set(emptyKey, emptyPayload)
    return { ...emptyPayload, snapshotId }
  }

  const symbols = coinQueries.map(({ symbol }) => symbol)
  const key = cacheKey(symbols)
  const cached = marketNewsCache.get(key)
  if (cached) {
    return { ...cached.value, snapshotId: cached.snapshotId }
  }

  try {
    const articleBatches = await Promise.all(
      coinQueries.map(({ rawQuery, symbol }) =>
        fetchMarketNewsForCoin(rawQuery, symbol),
      ),
    )

    const articles = dedupeArticles(articleBatches.flat())

    const payload = {
      totalResults: articles.length,
      articles,
      nextPage: null,
    }

    const snapshotId = marketNewsCache.set(key, payload)
    return { ...payload, snapshotId }
  } catch (error) {
    const stale = marketNewsCache.getStale(key)
    if (stale) {
      return { ...stale.value, snapshotId: stale.snapshotId }
    }
    throw error
  }
}
