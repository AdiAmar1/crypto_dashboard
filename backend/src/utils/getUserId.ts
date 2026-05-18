import type { Request } from 'express'

export function getUserId(_req: Request): string {
  // Placeholder until auth middleware attaches userId to the request.
  return '1'
}
