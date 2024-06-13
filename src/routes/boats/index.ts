import express from 'express'

import boatRouter from './boats'

const router = express.Router()

// routes
router.use('/', boatRouter)

export default router
