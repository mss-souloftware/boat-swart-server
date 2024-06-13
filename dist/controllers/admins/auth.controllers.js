"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generic_response_1 = require("generic-response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const database_config_1 = __importDefault(require("../../config/database.config"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield database_config_1.default.admins.findUnique({ where: { username } });
        console.log('user', user);
        if (user === null) {
            const response = (0, generic_response_1.unauthorizedResponse)('Incorrect email or password.');
            return res.status(response.status.code).json(response);
        }
        if (user.password !== password) {
            const response = (0, generic_response_1.unauthorizedResponse)('Incorrect email or password.');
            return res.status(response.status.code).json(response);
        }
        const payload = {
            userId: user.id,
            role: 'ADMIN'
        };
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET);
        const response = (0, generic_response_1.okResponse)({ token, user: payload }, 'Login Success.');
        return res.status(response.status.code).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            const response = (0, generic_response_1.serverErrorResponse)(error.message);
            return res.status(response.status.code).json(response);
        }
        else {
            const response = (0, generic_response_1.serverErrorResponse)('An unexpected error occurred');
            return res.status(response.status.code).json(response);
        }
    }
});
exports.default = {
    login
};
