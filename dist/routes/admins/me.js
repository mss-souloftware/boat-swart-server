"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = __importDefault(require("../../middlewares/validateRequest.middleware"));
const authRequired_middleware_1 = __importDefault(require("../../middlewares/authRequired.middleware"));
const rolesRequired_middleware_1 = __importDefault(require("../../middlewares/rolesRequired.middleware"));
const me_1 = __importDefault(require("../../validations/admins/me"));
const me_controllers_1 = __importDefault(require("../../controllers/admins/me.controllers"));
const router = express_1.default.Router();
router.get('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(me_1.default.getMyProfile), me_controllers_1.default.getMyProfile);
router.post('/change-password', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(me_1.default.changePassword), me_controllers_1.default.changePassword);
router.patch('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(me_1.default.updateMyProfile), me_controllers_1.default.updateMyProfile);
exports.default = router;
