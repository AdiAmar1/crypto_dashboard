import { Router } from 'express'
import * as funMemeController from '../controllers/funMemeController.js'

const router = Router()

router.get('/', funMemeController.getFunMeme)

export default router
