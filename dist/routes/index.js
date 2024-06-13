"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admins_1 = __importDefault(require("./admins"));
const captain_1 = __importDefault(require("./captain"));
const boats_1 = __importDefault(require("./boats"));
const reports_1 = __importDefault(require("./reports"));
const router = express_1.default.Router();
// routes
router.use('/admins', admins_1.default);
router.use('/captains', captain_1.default);
router.use('/boats', boats_1.default);
router.use('/reports', reports_1.default);
exports.default = router;
