import Joi from 'joi'

const getAllCaptain = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const getSingleCaptain = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    captainId: Joi.string().required()
  }),
  body: Joi.object({})
})

const createCaptain = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
  })
})

const deleteCaptain = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    captainId: Joi.string().required()
  }),
  body: Joi.object({})
})

export default {
  getAllCaptain,
  getSingleCaptain,
  createCaptain,
  deleteCaptain
}
