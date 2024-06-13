"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = __importDefault(require("../../middlewares/validateRequest.middleware"));
const authRequired_middleware_1 = __importDefault(require("../../middlewares/authRequired.middleware"));
const rolesRequired_middleware_1 = __importDefault(require("../../middlewares/rolesRequired.middleware"));
const boats_1 = __importDefault(require("../../validations/boats/boats"));
const boats_controllers_1 = __importDefault(require("../../controllers/boats/boats.controllers"));
const router = express_1.default.Router();
router.get('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(boats_1.default.getAllBoats), boats_controllers_1.default.getAllBoats);
router.get('/:boatId', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN', 'CAPTAIN']), (0, validateRequest_middleware_1.default)(boats_1.default.getSingleBoats), boats_controllers_1.default.getSingleBoats);
router.post('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(boats_1.default.createBoat), boats_controllers_1.default.createBoat);
router.patch('/:boatId', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN', 'CAPTAIN']), (0, validateRequest_middleware_1.default)(boats_1.default.updateBoat), boats_controllers_1.default.updateBoat);
router.delete('/:boatId', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN']), (0, validateRequest_middleware_1.default)(boats_1.default.deleteBoat), boats_controllers_1.default.deleteBoat);
exports.default = router;
