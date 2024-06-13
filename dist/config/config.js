"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envFile = process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../../${envFile}`)
});
const config = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    JWT_SECRET: process.env.JWT_SECRET
};
exports.default = config;
