import Joi from 'joi'

const getCaptainBoat = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    captainId: Joi.string().required()
  }),
  body: Joi.object({})
})

export default {
  getCaptainBoat
}
