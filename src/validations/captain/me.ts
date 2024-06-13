import Joi from 'joi'

const getMyProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const changePassword = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
})

const updateMyProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
  })
})

export default {
  getMyProfile,
  changePassword,
  updateMyProfile
}
