import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'

import authValidations from '../../validations/captain/auth'
import authControllers from '../../controllers/captain/auth.controllers'

const router = express.Router()

router.post('/login', validateRequest(authValidations.login), authControllers.login)

export default router
