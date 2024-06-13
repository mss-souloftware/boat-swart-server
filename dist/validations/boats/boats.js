"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getAllBoats = joi_1.default.object({
    query: joi_1.default.object({
        category: joi_1.default.string().valid('A', 'B', 'C', 'D').optional()
    }),
    params: joi_1.default.object({}),
    body: joi_1.default.object({})
});
const getSingleBoats = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({
        boatId: joi_1.default.string().required()
    }),
    body: joi_1.default.object({})
});
const createBoat = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        number: joi_1.default.string().required(),
        category: joi_1.default.string().valid('A', 'B', 'C', 'D').required(),
        captainId: joi_1.default.string().allow(null).optional(),
        currentLocation: joi_1.default.string().required(),
        nextLocation: joi_1.default.string().required(),
        operationType: joi_1.default.string().required(),
        arrivalTime: joi_1.default.string().required(),
        departureTime: joi_1.default.string().required(),
        OBM: joi_1.default.object({
            opearionType: joi_1.default.string().required(),
            manifested: joi_1.default.boolean().required(),
            quantitySupplied: joi_1.default.number().required(),
            remainingQuantity: joi_1.default.number().required()
        })
    })
});
const updateBoat = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({
        boatId: joi_1.default.string().required()
    }),
    body: joi_1.default.object({
        name: joi_1.default.string().optional(),
        number: joi_1.default.string().optional(),
        category: joi_1.default.string().valid('A', 'B', 'C', 'D').optional(),
        captainId: joi_1.default.number().allow(null).optional(),
        currentLocation: joi_1.default.string().optional(),
        nextLocation: joi_1.default.string().optional(),
        operationType: joi_1.default.string().optional(),
        arrivalTime: joi_1.default.date().optional(),
        departureTime: joi_1.default.date().optional(),
        OBM: joi_1.default.object({
            opearionType: joi_1.default.string().optional(),
            manifested: joi_1.default.boolean().optional(),
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional()
        }),
        Cement: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        }),
        BlendedCement: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        }),
        Safra: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        }),
        Diesel: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        }),
        FreshWater: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        }),
        WBM: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        }),
        Brine: joi_1.default.object({
            quantitySupplied: joi_1.default.number().optional(),
            remainingQuantity: joi_1.default.number().optional(),
            manifested: joi_1.default.boolean().optional(),
            additionalInfo: joi_1.default.string().optional()
        })
    })
});
const deleteBoat = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({
        boatId: joi_1.default.string().required()
    }),
    body: joi_1.default.object({})
});
exports.default = {
    getAllBoats,
    getSingleBoats,
    createBoat,
    updateBoat,
    deleteBoat
};
