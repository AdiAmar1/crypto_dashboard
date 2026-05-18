import cors from 'cors'
import express from 'express'
import coinPriceRoutes from './routes/coinPriceRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/coins', coinPriceRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
