"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getMyProfile = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({})
});
const changePassword = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({
        oldPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().min(8).required()
    })
});
const updateMyProfile = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({
        fullName: joi_1.default.string().optional(),
        username: joi_1.default.string().optional()
    })
});
exports.default = {
    getMyProfile,
    changePassword,
    updateMyProfile
};
