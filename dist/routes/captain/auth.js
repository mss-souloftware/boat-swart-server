"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = __importDefault(require("../../middlewares/validateRequest.middleware"));
const auth_1 = __importDefault(require("../../validations/captain/auth"));
const auth_controllers_1 = __importDefault(require("../../controllers/captain/auth.controllers"));
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_middleware_1.default)(auth_1.default.login), auth_controllers_1.default.login);
exports.default = router;
