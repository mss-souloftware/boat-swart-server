"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = __importDefault(require("../../middlewares/validateRequest.middleware"));
const authRequired_middleware_1 = __importDefault(require("../../middlewares/authRequired.middleware"));
const rolesRequired_middleware_1 = __importDefault(require("../../middlewares/rolesRequired.middleware"));
const boat_1 = __importDefault(require("../../validations/captain/boat"));
const boat_controllers_1 = __importDefault(require("../../controllers/captain/boat.controllers"));
const router = express_1.default.Router({ mergeParams: true });
router.get('/', authRequired_middleware_1.default, (0, rolesRequired_middleware_1.default)(['ADMIN', 'CAPTAIN']), (0, validateRequest_middleware_1.default)(boat_1.default.getCaptainBoat), boat_controllers_1.default.getCaptainBoat);
exports.default = router;
