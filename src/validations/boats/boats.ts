import Joi from 'joi'

const getAllBoats = Joi.object({
  query: Joi.object({
    category: Joi.string().valid('A', 'B', 'C', 'D').optional()
  }),
  params: Joi.object({}),
  body: Joi.object({})
})

const getSingleBoats = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    boatId: Joi.string().required()
  }),
  body: Joi.object({})
})

const createBoat = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required(),
    category: Joi.string().valid('A', 'B', 'C', 'D').required(),
    captainId: Joi.string().allow(null).optional(),
    currentLocation: Joi.string().required(),
    nextLocation: Joi.string().required(),
    operationType: Joi.string().required(),
    arrivalTime: Joi.string().required(),
    departureTime: Joi.string().required(),
    OBM: Joi.object({
      opearionType: Joi.string().required(),
      manifested: Joi.boolean().required(),
      quantitySupplied: Joi.number().required(),
      remainingQuantity: Joi.number().required()
    })
  })
})

const updateBoat = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    boatId: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    number: Joi.string().optional(),
    category: Joi.string().valid('A', 'B', 'C', 'D').optional(),
    captainId: Joi.number().allow(null).optional(),
    currentLocation: Joi.string().optional(),
    nextLocation: Joi.string().optional(),
    operationType: Joi.string().optional(),
    arrivalTime: Joi.date().optional(),
    departureTime: Joi.date().optional(),
    OBM: Joi.object({
      opearionType: Joi.string().optional(),
      manifested: Joi.boolean().optional(),
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional()
    }),
    Cement: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    }),
    BlendedCement: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    }),
    Safra: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    }),
    Diesel: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    }),
    FreshWater: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    }),
    WBM: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    }),
    Brine: Joi.object({
      quantitySupplied: Joi.number().optional(),
      remainingQuantity: Joi.number().optional(),
      manifested: Joi.boolean().optional(),
      additionalInfo: Joi.string().optional()
    })
  })
})

const deleteBoat = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    boatId: Joi.string().required()
  }),
  body: Joi.object({})
})

export default {
  getAllBoats,
  getSingleBoats,
  createBoat,
  updateBoat,
  deleteBoat
}
