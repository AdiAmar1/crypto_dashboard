import type { Request, Response } from 'express'
import * as marketNewsService from '../services/marketNewsService.js'

function parseCoinsQuery(value: unknown): string[] {
  const raw =
    typeof value === 'string'
      ? [value]
      : Array.isArray(value)
        ? value.filter((item): item is string => typeof item === 'string')
        : []

  return [
    ...new Set(
      raw
        .flatMap((item) => item.split(','))
        .map((coin) => coin.trim())
        .filter((coin) => coin !== ''),
    ),
  ]
}

export async function getMarketNews(
  req: Request,
  res: Response,
): Promise<void> {
  const coins = parseCoinsQuery(req.query.q)

  if (coins.length === 0) {
    res.status(400).json({ error: 'q query parameter is required' })
    return
  }

  try {
    const news = await marketNewsService.getMarketNews({ coins })
    res.json(news)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch market news'
    res.status(502).json({ error: message })
  }
}
