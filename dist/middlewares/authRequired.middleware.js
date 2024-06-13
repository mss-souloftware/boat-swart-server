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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generic_response_1 = require("generic-response");
const database_config_1 = __importDefault(require("../config/database.config"));
const config_1 = __importDefault(require("../config/config"));
const authRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (token === undefined) {
        const response = (0, generic_response_1.badRequestResponse)('Authorization Token not provided.');
        res.status(response.status.code).json(response);
        return;
    }
    if (token.split(' ')[0] !== 'Bearer') {
        const response = (0, generic_response_1.badRequestResponse)('Invalid token format.');
        res.status(response.status.code).json(response);
        return;
    }
    token = token.split(' ')[1];
    try {
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        let user = null;
        if (decodedUser.role === 'ADMIN') {
            user = yield database_config_1.default.admins.findUnique({ where: { id: decodedUser.userId } });
        }
        else if (decodedUser.role === 'CAPTAIN') {
            user = yield database_config_1.default.captains.findUnique({ where: { id: decodedUser.userId } });
        }
        if (user === null) {
            const response = (0, generic_response_1.unauthorizedResponse)('Invalid token.');
            res.status(response.status.code).json(response);
            return;
        }
        req.user = {
            userId: user.id,
            role: decodedUser.role
        };
        next();
    }
    catch (err) {
        const response = (0, generic_response_1.unauthorizedResponse)('Invalid token.');
        res.status(response.status.code).json(response);
    }
});
exports.default = authRequired;
