import type { Request, Response } from 'express'
import * as dailyInsightsService from '../services/dailyInsightsService.js'

const MAX_COINS = 10

function parseCoins(value: unknown): string[] | null {
  let raw: string[] = []

  if (typeof value === 'string') {
    raw = value
      .split(',')
      .map((coin) => coin.trim())
      .filter(Boolean)
  } else if (Array.isArray(value)) {
    raw = value
      .flatMap((item) => (typeof item === 'string' ? item.split(',') : []))
      .map((coin) => coin.trim())
      .filter(Boolean)
  }

  if (raw.length === 0) {
    return null
  }

  return raw
}

export async function getDailyInsights(
  req: Request,
  res: Response,
): Promise<void> {
  const coins = parseCoins(req.query.coins)

  if (!coins) {
    res.status(400).json({
      error: 'coins query parameter is required',
    })
    return
  }

  if (coins.length > MAX_COINS) {
    res.status(400).json({
      error: `coins array may contain at most ${MAX_COINS} items`,
    })
    return
  }

  try {
    const result = await dailyInsightsService.getDailyInsights({ coins })
    res.json(result)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate daily insights'
    res.status(502).json({ error: message })
  }
}
