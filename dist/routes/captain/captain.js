"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = __importDefault(require("../../middlewares/validateRequest.middleware"));
const authRequired_middleware_1 = __importDefault(require("../../middlewares/authRequired.middleware"));
const rolesRequired_middleware_1 = __importDefault(require("../../middlewares/rolesRequired.middleware"));
const captain_1 = __importDefault(require("../../validations/captain/captain"));
const captain_controllers_1 = __importDefault(require("../../controllers/captain/captain.controllers"));
const router = express_1.default.Router();
router.get('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(captain_1.default.getAllCaptain), captain_controllers_1.default.getAllCaptain);
router.get('/:captainId', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(captain_1.default.getSingleCaptain), captain_controllers_1.default.getSingleCaptain);
router.post('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(captain_1.default.createCaptain), captain_controllers_1.default.createCaptain);
router.delete('/:captainId', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(captain_1.default.deleteCaptain), captain_controllers_1.default.deleteCaptain);
exports.default = router;
