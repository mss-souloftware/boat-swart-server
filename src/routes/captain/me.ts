import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import authValidations from '../../validations/captain/me'
import authControllers from '../../controllers/captain/me.controllers'

const router = express.Router()

router.get(
  '/',
  authRequired,
  rolesRequired(['CAPTAIN']),
  validateRequest(authValidations.getMyProfile),
  authControllers.getMyProfile
)
router.post(
  '/change-password',
  authRequired,
  rolesRequired(['CAPTAIN']),
  validateRequest(authValidations.changePassword),
  authControllers.changePassword
)
router.patch(
  '/',
  authRequired,
  rolesRequired(['CAPTAIN']),
  validateRequest(authValidations.updateMyProfile),
  authControllers.updateMyProfile
)

export default router
