import 'dotenv/config'
import { initDatabase } from './db/database.js'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import coinPriceRoutes from './routes/coinPriceRoutes.js'
import dailyInsightsRoutes from './routes/dailyInsightsRoutes.js'
import funMemeRoutes from './routes/funMemeRoutes.js'
import marketNewsRoutes from './routes/marketNewsRoutes.js'
import userRoutes, { protectedUserRoutes } from './routes/userRoutes.js'
import voteRoutes from './routes/voteRoutes.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { PORT, SERVER_ORIGIN } from './config/app.js'

const app = express()
const port = PORT

const sessionSecret = process.env.SESSION_SECRET ?? 'dev-session-secret'

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use(express.json())
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
)

app.use('/api/user', userRoutes)
app.use('/api/user', authMiddleware, protectedUserRoutes)
app.use('/api/coins', authMiddleware, coinPriceRoutes)
app.use('/api/news', authMiddleware, marketNewsRoutes)
app.use('/api/insights', authMiddleware, dailyInsightsRoutes)
app.use('/api/fun-meme', authMiddleware, funMemeRoutes)
app.use('/api/votes', authMiddleware, voteRoutes)

async function startServer(): Promise<void> {
  await initDatabase()

  const server = app.listen(port)

  server.on('listening', () => {
    console.log(`Server is running on ${SERVER_ORIGIN}`)
  })

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${port} is already in use. Stop the other process on that port, then run npm run dev again.`,
      )
    } else {
      console.error('Failed to start server:', err.message)
    }
    process.exit(1)
  })
}

startServer().catch((err: unknown) => {
  console.error('Failed to initialize database:', err)
  process.exit(1)
})
