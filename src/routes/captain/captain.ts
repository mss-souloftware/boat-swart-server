import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import authValidations from '../../validations/captain/captain'
import authControllers from '../../controllers/captain/captain.controllers'

const router = express.Router()

router.get(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.getAllCaptain),
  authControllers.getAllCaptain
)
router.get(
  '/:captainId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.getSingleCaptain),
  authControllers.getSingleCaptain
)
router.post(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.createCaptain),
  authControllers.createCaptain
)
router.delete(
  '/:captainId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.deleteCaptain),
  authControllers.deleteCaptain
)

export default router
