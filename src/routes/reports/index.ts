import express from 'express'

import reportsRouter from './reports'

const router = express.Router()

// routes
router.use('/', reportsRouter)

export default router
