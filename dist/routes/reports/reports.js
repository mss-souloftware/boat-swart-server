"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = __importDefault(require("../../middlewares/validateRequest.middleware"));
const authRequired_middleware_1 = __importDefault(require("../../middlewares/authRequired.middleware"));
const rolesRequired_middleware_1 = __importDefault(require("../../middlewares/rolesRequired.middleware"));
const reports_1 = __importDefault(require("../../validations/reports/reports"));
const reports_controllers_1 = __importDefault(require("../../controllers/reports/reports.controllers"));
const router = express_1.default.Router();
router.get('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(reports_1.default.getReport), reports_controllers_1.default.getReport);
exports.default = router;
