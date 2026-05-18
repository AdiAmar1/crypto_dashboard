import { Router } from 'express'
import * as userController from '../controllers/userController.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/data', userController.getUserData)
router.put('/preferences', userController.savePreferences)

export default router
