import { Router } from 'express'
import * as dailyInsightsController from '../controllers/dailyInsightsController.js'

const router = Router()

router.get('/', dailyInsightsController.getDailyInsights)

export default router
