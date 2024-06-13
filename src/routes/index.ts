import express from 'express'

import adminRouter from './admins'
import captainRouter from './captain'
import boatsRouter from './boats'
import reportsRouter from './reports'

const router = express.Router()

// routes
router.use('/admins', adminRouter)
router.use('/captains', captainRouter)
router.use('/boats', boatsRouter)
router.use('/reports', reportsRouter)

export default router
