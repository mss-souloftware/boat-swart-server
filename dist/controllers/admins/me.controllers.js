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
const database_config_1 = __importDefault(require("../../config/database.config"));
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user === undefined) {
        const response = (0, generic_response_1.unauthorizedResponse)();
        return res.status(response.status.code).json(response);
    }
    const { userId } = user;
    try {
        const user = yield database_config_1.default.admins.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                username: true,
                createdAt: true,
                updatedAt: true
            }
        });
        const response = (0, generic_response_1.okResponse)({ user });
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
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    if (user === undefined) {
        const response = (0, generic_response_1.unauthorizedResponse)();
        return res.status(response.status.code).json(response);
    }
    const { userId } = user;
    try {
        const user = yield database_config_1.default.admins.findUnique({
            where: { id: userId }
        });
        if (user === null) {
            const response = (0, generic_response_1.notFoundResponse)('user not found');
            return res.status(response.status.code).json(response);
        }
        if (user.password !== oldPassword) {
            const response = (0, generic_response_1.badRequestResponse)('incorrect password');
            return res.status(response.status.code).json(response);
        }
        yield database_config_1.default.admins.update({ where: { id: userId }, data: { password: newPassword } });
        const response = (0, generic_response_1.updateSuccessResponse)();
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
const updateMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    if (user === undefined) {
        const response = (0, generic_response_1.unauthorizedResponse)();
        return res.status(response.status.code).json(response);
    }
    const { userId } = user;
    try {
        if (data.username != null) {
            const existingUsername = yield database_config_1.default.admins.findUnique({
                where: { username: data.username }
            });
            if (existingUsername != null) {
                const response = (0, generic_response_1.badRequestResponse)('username already exists');
                return res.status(response.status.code).json(response);
            }
        }
        const user = yield database_config_1.default.admins.update({ where: { id: userId }, data });
        const response = (0, generic_response_1.updateSuccessResponse)({ user });
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
    getMyProfile,
    changePassword,
    updateMyProfile
};
