import type { CookieOptions as ExpressCookieOptions } from 'express'
import type { CookieOptions as SessionCookieOptions } from 'express-session'

export const PORT = Number(process.env.PORT ?? 3000)

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173'

export const SERVER_ORIGIN =
  process.env.SERVER_ORIGIN ?? `http://localhost:${PORT}`

/** Cross-site frontend (Vercel) + API (Render) needs SameSite=None + Secure. */
export const SESSION_COOKIE: SessionCookieOptions = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: IS_PRODUCTION ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const SESSION_COOKIE_CLEAR: ExpressCookieOptions = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: IS_PRODUCTION ? 'none' : 'lax',
}
