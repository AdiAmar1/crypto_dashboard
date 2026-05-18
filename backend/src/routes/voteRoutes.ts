import { Router } from 'express'
import * as voteController from '../controllers/voteController.js'

const router = Router()

router.get('/', voteController.getVote)
router.post('/', voteController.postVote)

export default router
