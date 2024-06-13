import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import authValidations from '../../validations/admins/me'
import authControllers from '../../controllers/admins/me.controllers'

const router = express.Router()

router.get(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.getMyProfile),
  authControllers.getMyProfile
)
router.post(
  '/change-password',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.changePassword),
  authControllers.changePassword
)
router.patch(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(authValidations.updateMyProfile),
  authControllers.updateMyProfile
)

export default router
