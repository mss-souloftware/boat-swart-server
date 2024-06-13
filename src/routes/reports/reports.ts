import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import authValidations from '../../validations/reports/reports'
import authControllers from '../../controllers/reports/reports.controllers'

const router = express.Router()

router.get(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.getReport),
  authControllers.getReport
)

export default router
