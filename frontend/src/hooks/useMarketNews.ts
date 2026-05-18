import { useQuery } from '@tanstack/react-query'
import { getMarketNews } from '../api/getMarketNews'
import type { MarketNewsArticle } from '../types/marketNews'

export const marketNewsQueryKey = ['marketNews'] as const

const STALE_TIME_MS = 60_000

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

export function useMarketNews(coins: string[]) {
  return useQuery({
    queryKey: [...marketNewsQueryKey, coins],
    queryFn: async () => {
      const results = await Promise.all(coins.map((coin) => getMarketNews(coin)))
      return dedupeArticles(results.flatMap((result) => result.articles))
    },
    enabled: coins.length > 0,
    staleTime: STALE_TIME_MS,
    refetchInterval: STALE_TIME_MS,
  })
}
