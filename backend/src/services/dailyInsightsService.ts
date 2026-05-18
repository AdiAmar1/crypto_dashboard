import {
  OPENROUTER_API_KEY,
  OPENROUTER_BASE_URL,
  OPENROUTER_MODEL,
} from '../config/openrouter.js'
import type {
  DailyInsightsRequest,
  DailyInsightsResult,
  OpenRouterChatCompletionRequest,
  OpenRouterChatCompletionResponse,
} from '../types/dailyInsights.js'
import { createTtlCache } from '../utils/cache.js'
import { resolveCoinSymbol } from '../utils/resolveCoinSymbol.js'

const CACHE_TTL_MS = 60_000
const dailyInsightsCache = createTtlCache<
  Omit<DailyInsightsResult, 'snapshotId'>
>(CACHE_TTL_MS)

function cacheKey(coins: string[]): string {
  return [...coins].sort().join(',')
}

function buildPrompt(coins: string[]): string {
  const coinList = coins.join(', ')
  const today = new Date().toISOString().slice(0, 10)

  return `Write a concise daily crypto market insight for a dashboard user watching these coins: ${coinList}.

Date: ${today}

Include:
- A brief market overview for these assets
- Notable trends or themes to watch today
- One practical takeaway for a retail holder

Keep it under 100 words. Use plain language. Do not give financial advice or buy/sell recommendations.`
}

export async function getDailyInsights(
  request: DailyInsightsRequest,
): Promise<DailyInsightsResult> {
  const coins = [...new Set(request.coins.map((coin) => resolveCoinSymbol(coin)))]

  const key = cacheKey(coins)
  const cached = dailyInsightsCache.get(key)
  if (cached) {
    return { ...cached.value, snapshotId: cached.snapshotId }
  }

  const body: OpenRouterChatCompletionRequest = {
    model: OPENROUTER_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a crypto market analyst writing short daily insights for a personal dashboard.',
      },
      {
        role: 'user',
        content: buildPrompt(coins),
      },
    ],
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'Crypto Dashboard',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(
      `OpenRouter request failed (${response.status}): ${message || response.statusText}`,
    )
  }

  const data = (await response.json()) as OpenRouterChatCompletionResponse

  if (data.error?.message) {
    throw new Error(data.error.message)
  }

  const insight = data.choices?.[0]?.message?.content?.trim()
  if (!insight) {
    throw new Error('OpenRouter returned an empty insight')
  }

  const payload = {
    coins,
    insight,
    generatedAt: new Date().toISOString(),
  }

  const snapshotId = dailyInsightsCache.set(key, payload)
  return { ...payload, snapshotId }
}
