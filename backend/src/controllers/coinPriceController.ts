import type { Request, Response } from 'express'
import * as coinPriceService from '../services/coinPriceService.js'

function parseCoinIds(idsParam: unknown): string[] {
  if (typeof idsParam === 'string') {
    return idsParam
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
  }

  if (Array.isArray(idsParam)) {
    return idsParam
      .flatMap((value) =>
        typeof value === 'string' ? value.split(',') : [],
      )
      .map((id) => id.trim())
      .filter(Boolean)
  }

  return []
}

export async function getCoinPrices(req: Request, res: Response): Promise<void> {
  const coinIds = parseCoinIds(req.query.ids)

  if (coinIds.length === 0) {
    res.status(400).json({ error: 'ids query parameter is required' })
    return
  }

  try {
    const coins = await coinPriceService.getCoinPrices(coinIds)
    res.json(coins)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch coin prices'
    res.status(502).json({ error: message })
  }
}
