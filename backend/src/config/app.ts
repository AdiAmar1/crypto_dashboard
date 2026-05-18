export const PORT = Number(process.env.PORT ?? 3000)

export const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173'

export const SERVER_ORIGIN =
  process.env.SERVER_ORIGIN ?? `http://localhost:${PORT}`
