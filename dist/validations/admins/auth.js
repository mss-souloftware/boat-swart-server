"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const login = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({}),
    body: joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    })
});
exports.default = {
    login
};
