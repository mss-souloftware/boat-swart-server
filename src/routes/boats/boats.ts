import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import boatValidations from '../../validations/boats/boats'
import boatControllers from '../../controllers/boats/boats.controllers'

const router = express.Router()

router.get(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(boatValidations.getAllBoats),
  boatControllers.getAllBoats
)
router.get(
  '/:boatId',
  authRequired,
  rolesRequired(['ADMIN', 'CAPTAIN']),
  validateRequest(boatValidations.getSingleBoats),
  boatControllers.getSingleBoats
)
router.post(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(boatValidations.createBoat),
  boatControllers.createBoat
)
router.patch(
  '/:boatId',
  authRequired,
  rolesRequired(['ADMIN', 'CAPTAIN']),
  validateRequest(boatValidations.updateBoat),
  boatControllers.updateBoat
)
router.delete(
  '/:boatId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(boatValidations.deleteBoat),
  boatControllers.deleteBoat
)

export default router
