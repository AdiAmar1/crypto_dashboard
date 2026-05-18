import { Router } from 'express'
import * as coinPriceController from '../controllers/coinPriceController.js'

const router = Router()

router.get('/prices', coinPriceController.getCoinPrices)

export default router
