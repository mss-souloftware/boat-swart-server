"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_req_res_inspector_1 = __importDefault(require("express-req-res-inspector"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use(express_1.default.static('uploads'));
app.use(express_1.default.json({ limit: '100mb' }));
app.use((0, cors_1.default)());
app.use((0, express_req_res_inspector_1.default)());
app.use('/api/v1', index_1.default);
exports.default = app;
