import type { Request, Response } from 'express'
import { UserError } from '../errors/userError.js'
import type {
  LoginRequest,
  RegisterRequest,
  UserPreferences,
} from '../types/user.js'
import * as userService from '../services/userService.js'
import { getUserId } from '../utils/getUserId.js'

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

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as LoginRequest
    const user = await userService.login(body)
    req.session.userId = user.id
    res.json(user)
  } catch (error) {
    if (error instanceof UserError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Failed to sign in' })
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })

    res.clearCookie('connect.sid')
    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Failed to sign out' })
  }
}

export async function getUserData(req: Request, res: Response): Promise<void> {
  try {
    const user = await userService.getUserData(getUserId(req))
    res.json(user)
  } catch (error) {
    if (error instanceof UserError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Failed to fetch user data' })
  }
}

export async function savePreferences(
  req: Request,
  res: Response,
): Promise<void> {
  const preferences = req.body.preferences as UserPreferences
  const result = await userService.savePreferences(preferences)
  res.send(result)
}
