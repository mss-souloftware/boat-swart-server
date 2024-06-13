"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getAllCaptain = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({})
});
const getSingleCaptain = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({
        captainId: joi_1.default.string().required()
    }),
    body: joi_1.default.object({})
});
const createCaptain = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({
        fullName: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        country: joi_1.default.string().required()
    })
});
const deleteCaptain = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({
        captainId: joi_1.default.string().required()
    }),
    body: joi_1.default.object({})
});
exports.default = {
    getAllCaptain,
    getSingleCaptain,
    createCaptain,
    deleteCaptain
};
