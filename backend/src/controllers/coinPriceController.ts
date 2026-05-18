import type { Request, Response } from 'express'
import * as coinPriceService from '../services/coinPriceService.js'

export async function getCoinPrices(_req: Request, res: Response): Promise<void> {
  try {
    const coins = await coinPriceService.getCoinPrices()
    res.json(coins)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch coin prices'
    res.status(502).json({ error: message })
  }
}
