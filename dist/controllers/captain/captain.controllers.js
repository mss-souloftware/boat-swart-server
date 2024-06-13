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
const getAllCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const captains = yield database_config_1.default.captains.findMany();
        const response = (0, generic_response_1.okResponse)({ captains });
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
const getSingleCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const captainId = req.params.captainId;
    try {
        const captain = yield database_config_1.default.captains.findUnique({
            where: { id: captainId }
        });
        if (captain === null) {
            const response = (0, generic_response_1.notFoundResponse)('captain not found');
            return res.status(response.status.code).json(response);
        }
        const response = (0, generic_response_1.okResponse)({ captain });
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
const createCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const existingEmail = yield database_config_1.default.captains.findUnique({
            where: { email: data.email }
        });
        if (existingEmail != null) {
            const response = (0, generic_response_1.badRequestResponse)('email already exists');
            return res.status(response.status.code).json(response);
        }
        const captain = yield database_config_1.default.captains.create({
            data: Object.assign({}, data)
        });
        const response = (0, generic_response_1.createSuccessResponse)({ captain });
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
const deleteCaptain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const captainId = req.params.captainId;
    try {
        const existingCaptain = yield database_config_1.default.captains.findUnique({
            where: { id: captainId }
        });
        if (existingCaptain === null) {
            const response = (0, generic_response_1.notFoundResponse)('captain not found');
            return res.status(response.status.code).json(response);
        }
        const captain = yield database_config_1.default.captains.delete({
            where: { id: captainId }
        });
        const response = (0, generic_response_1.okResponse)({ captain });
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
    getAllCaptain,
    getSingleCaptain,
    createCaptain,
    deleteCaptain
};
