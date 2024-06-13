import express from 'express'

import authRouter from './auth'
import meRouter from './me'
import boatRouter from './boat'
import captainRouter from './captain'

const router = express.Router()

// routes
router.use('/auth', authRouter)
router.use('/me', meRouter)
router.use('/:captainId/boat', boatRouter)
router.use('/', captainRouter)

export default router
