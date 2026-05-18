import type { Request, Response } from 'express'
import * as marketNewsService from '../services/marketNewsService.js'

function pickQueryParam(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== ''
    ? value.trim()
    : undefined
}

export async function getMarketNews(
  req: Request,
  res: Response,
): Promise<void> {
  const q = pickQueryParam(req.query.q)

  if (!q) {
    res.status(400).json({ error: 'q query parameter is required' })
    return
  }

  try {
    const news = await marketNewsService.getMarketNews({ q })
    res.json(news)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch market news'
    res.status(502).json({ error: message })
  }
}
