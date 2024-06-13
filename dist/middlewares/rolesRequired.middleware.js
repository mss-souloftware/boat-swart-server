"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_response_1 = require("generic-response");
const rolesRequired = (rolesArray) => (req, res, next) => {
    const { user } = req;
    if (user === undefined || !rolesArray.includes(user.role)) {
        const response = (0, generic_response_1.unauthorizedResponse)('Access denied. Insufficient permissions.');
        return res.status(response.status.code).json(response);
    }
    next();
};
exports.default = rolesRequired;
