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
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalNumberOfBoats = yield database_config_1.default.boats.count();
        const totalNumberOfCaptains = yield database_config_1.default.captains.count();
        // total boats category wise
        const totalNumberOfBoatsInCategoryA = yield database_config_1.default.boats.count({
            where: { category: 'A' }
        });
        const totalNumberOfBoatsInCategoryB = yield database_config_1.default.boats.count({
            where: { category: 'B' }
        });
        const totalNumberOfBoatsInCategoryC = yield database_config_1.default.boats.count({
            where: { category: 'C' }
        });
        const totalNumberOfBoatsInCategoryD = yield database_config_1.default.boats.count({
            where: { category: 'D' }
        });
        const report = {
            totalNumberOfCaptains,
            totalNumberOfBoats,
            totalBoatsCategoryWise: {
                A: totalNumberOfBoatsInCategoryA,
                B: totalNumberOfBoatsInCategoryB,
                C: totalNumberOfBoatsInCategoryC,
                D: totalNumberOfBoatsInCategoryD
            }
        };
        const response = (0, generic_response_1.okResponse)({ report });
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
    getReport
};
