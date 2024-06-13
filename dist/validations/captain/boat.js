"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getCaptainBoat = joi_1.default.object({
    query: joi_1.default.object({}),
    params: joi_1.default.object({
        captainId: joi_1.default.string().required()
    }),
    body: joi_1.default.object({})
});
exports.default = {
    getCaptainBoat
};
