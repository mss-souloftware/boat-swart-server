"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const me_1 = __importDefault(require("./me"));
const boat_1 = __importDefault(require("./boat"));
const captain_1 = __importDefault(require("./captain"));
const router = express_1.default.Router();
// routes
router.use('/auth', auth_1.default);
router.use('/me', me_1.default);
router.use('/:captainId/boat', boat_1.default);
router.use('/', captain_1.default);
exports.default = router;
