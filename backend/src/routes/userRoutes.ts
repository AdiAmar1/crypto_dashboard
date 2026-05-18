import { Router } from 'express'
import * as userController from '../controllers/userController.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

export const protectedUserRoutes = Router()

protectedUserRoutes.post('/logout', userController.logout)
protectedUserRoutes.get('/data', userController.getUserData)
protectedUserRoutes.put('/preferences', userController.savePreferences)

export default router
