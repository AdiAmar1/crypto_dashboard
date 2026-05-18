import { Router } from 'express'
import * as marketNewsController from '../controllers/marketNewsController.js'

const router = Router()

router.get('/crypto', marketNewsController.getMarketNews)

export default router
