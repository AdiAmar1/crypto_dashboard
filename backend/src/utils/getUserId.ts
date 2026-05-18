import type { Request } from 'express'

export function getUserId(req: Request): string {
  const userId = req.session.userId
  if (!userId) {
    throw new Error('Authenticated user id is missing from session')
  }

  return userId
}
