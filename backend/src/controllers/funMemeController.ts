import type { Request, Response } from 'express'
import * as funMemeService from '../services/funMemeService.js'

export async function getFunMeme(
  _req: Request,
  res: Response,
): Promise<void> {
  const result = await funMemeService.getFunMeme()
  res.json(result)
}
