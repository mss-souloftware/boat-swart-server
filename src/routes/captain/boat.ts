import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import authValidations from '../../validations/captain/boat'
import authControllers from '../../controllers/captain/boat.controllers'

const router = express.Router({ mergeParams: true })

router.get(
  '/',
  authRequired,
  rolesRequired(['ADMIN', 'CAPTAIN']),
  validateRequest(authValidations.getCaptainBoat),
  authControllers.getCaptainBoat
)

export default router
