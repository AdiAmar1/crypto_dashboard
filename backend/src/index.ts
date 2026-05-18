import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import coinPriceRoutes from './routes/coinPriceRoutes.js'
import dailyInsightsRoutes from './routes/dailyInsightsRoutes.js'
import funMemeRoutes from './routes/funMemeRoutes.js'
import marketNewsRoutes from './routes/marketNewsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import voteRoutes from './routes/voteRoutes.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/coins', coinPriceRoutes)
app.use('/api/news', marketNewsRoutes)
app.use('/api/insights', dailyInsightsRoutes)
app.use('/api/fun-meme', funMemeRoutes)
app.use('/api/votes', voteRoutes)

const server = app.listen(port)

server.on('listening', () => {
  console.log(`Server is running on http://localhost:${port}`)
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
