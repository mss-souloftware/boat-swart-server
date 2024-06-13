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
const extractNestedProperties = (obj) => {
    const nonNestedProperties = {};
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            nonNestedProperties[key] = obj[key];
        }
    });
    return nonNestedProperties;
};
const extractNonNestedProperties = (obj) => {
    const nonNestedProperties = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] === null || key === 'OBM' || typeof obj[key] !== 'object') {
            nonNestedProperties[key] = obj[key];
        }
    });
    return nonNestedProperties;
};
const transformBoatUpdate = (input) => {
    const transformed = Object.assign({}, input);
    for (const key in transformed) {
        if (Boolean(transformed[key]) && typeof transformed[key] === 'object') {
            transformed[key] = {
                update: transformed[key]
            };
        }
    }
    return transformed;
};
const updateBoatProperties = (boatId, data, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (type === 'nested') {
        data = transformBoatUpdate(data);
    }
    if (type === 'non-nested') {
        data = transformBoatUpdate(data);
        if (data.captainId !== undefined && data.captainId !== null) {
            const captain = yield database_config_1.default.captains.findUnique({
                where: { id: data.captainId },
                include: { Boat: true }
            });
            if (captain === null) {
                throw new Error('captain not found');
            }
            if (captain.Boat.length > 0) {
                throw new Error('captain has already one boat assigned');
            }
            const boat = yield database_config_1.default.boats.findUnique({
                where: { id: boatId }
            });
            if ((boat === null || boat === void 0 ? void 0 : boat.captainId) !== null) {
                throw new Error('boat is already assigned to someone');
            }
        }
    }
    console.log('final', data);
    yield database_config_1.default.boats.update({
        where: { id: boatId },
        // @ts-expect-error Unreachable code error
        data: Object.assign({}, data)
    });
});
const getAllBoats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const boats = yield database_config_1.default.boats.findMany({
            where: { category },
            include: {
                Captain: true
            }
        });
        const response = (0, generic_response_1.okResponse)({ boats });
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
const getSingleBoats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const baotId = req.params.boatId;
    try {
        const boat = yield database_config_1.default.boats.findUnique({
            where: { id: baotId },
            include: {
                Captain: true,
                OBM: true,
                Cement: true,
                BlendedCement: true,
                Safra: true,
                Diesel: true,
                FreshWater: true,
                WBM: true,
                Brine: true
            }
        });
        if (boat === null) {
            const response = (0, generic_response_1.notFoundResponse)('boat not found');
            return res.status(response.status.code).json(response);
        }
        const response = (0, generic_response_1.okResponse)({ boat });
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
const createBoat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (data.captainId !== null) {
            const existingCaptain = yield database_config_1.default.captains.findUnique({
                where: { id: data.captainId }
            });
            if (existingCaptain === null) {
                const response = (0, generic_response_1.notFoundResponse)('Captain not found');
                return res.status(response.status.code).json(response);
            }
            const captainAssignedBoat = yield database_config_1.default.boats.findFirst({
                where: { captainId: data.captainId }
            });
            if (captainAssignedBoat !== null) {
                const response = (0, generic_response_1.badRequestResponse)(`Captain with id: ${data.captainId} already has a boat assigned.`);
                return res.status(response.status.code).json(response);
            }
        }
        const boat = yield database_config_1.default.boats.create({
            data: Object.assign(Object.assign({}, data), { OBM: { create: Object.assign({}, data.OBM) }, Cement: { create: {} }, BlendedCement: { create: {} }, Safra: { create: {} }, Diesel: { create: {} }, FreshWater: { create: {} }, WBM: { create: {} }, Brine: { create: {} } })
        });
        const response = (0, generic_response_1.updateSuccessResponse)({ boat });
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
const updateBoat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const boatId = req.params.boatId;
    const data = req.body;
    try {
        const existingBoat = yield database_config_1.default.boats.findUnique({
            where: { id: boatId }
        });
        if (existingBoat === null) {
            const response = (0, generic_response_1.notFoundResponse)('boat not found');
            return res.status(response.status.code).json(response);
        }
        if ((user === null || user === void 0 ? void 0 : user.role) === 'CAPTAIN' && existingBoat.captainId !== user.userId) {
            const response = (0, generic_response_1.unauthorizedResponse)('not your boat');
            return res.status(response.status.code).json(response);
        }
        if ((user === null || user === void 0 ? void 0 : user.role) === 'ADMIN') {
            const nonNestedProperties = extractNonNestedProperties(data);
            yield updateBoatProperties(boatId, nonNestedProperties, 'non-nested');
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) === 'CAPTAIN') {
            const nestedProperties = extractNestedProperties(data);
            yield updateBoatProperties(boatId, nestedProperties, 'nested');
        }
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
const deleteBoat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const baotId = req.params.boatId;
    try {
        const existingBoat = yield database_config_1.default.boats.findUnique({
            where: { id: baotId }
        });
        if (existingBoat === null) {
            const response = (0, generic_response_1.notFoundResponse)('boat not found');
            return res.status(response.status.code).json(response);
        }
        const boat = yield database_config_1.default.boats.delete({
            where: { id: baotId }
        });
        const response = (0, generic_response_1.deleteSuccessResponse)({ boat });
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
    getAllBoats,
    getSingleBoats,
    createBoat,
    updateBoat,
    deleteBoat
};
