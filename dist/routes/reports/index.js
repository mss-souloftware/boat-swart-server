"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reports_1 = __importDefault(require("./reports"));
const router = express_1.default.Router();
// routes
router.use('/', reports_1.default);
exports.default = router;
