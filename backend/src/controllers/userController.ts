import type { Request, Response } from 'express'
import type { WidgetPreference } from '../types/widgetPreference.js'
import * as userService from '../services/userService.js'

export async function register(_req: Request, res: Response): Promise<void> {
  const result = await userService.register()
  res.send(result)
}

export async function login(_req: Request, res: Response): Promise<void> {
  const result = await userService.login()
  res.send(result)
}

export async function getUserData(_req: Request, res: Response): Promise<void> {
  const user = await userService.getUserData()
  res.json(user)
}

export async function savePreferences(
  req: Request,
  res: Response,
): Promise<void> {
  const preferences = req.body.preferences as WidgetPreference[]
  const result = await userService.savePreferences(preferences)
  res.send(result)
}
