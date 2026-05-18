import type { Request, Response } from 'express'
import { UserError } from '../errors/userError.js'
import type { RegisterRequest, UserPreferences } from '../types/user.js'
import * as userService from '../services/userService.js'

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as RegisterRequest
    const user = await userService.register(body)
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof UserError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Failed to create account' })
  }
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
  const preferences = req.body.preferences as UserPreferences
  const result = await userService.savePreferences(preferences)
  res.send(result)
}
