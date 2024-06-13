"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_response_1 = require("generic-response");
const validateRequest = (schema) => (req, res, next) => {
    const { body, params, query } = req;
    try {
        const { error } = schema.validate({ body, params, query }, { abortEarly: true });
        if (error !== undefined) {
            const errorMessage = error.details[0].message;
            const response = (0, generic_response_1.badRequestResponse)(errorMessage);
            return res.status(response.status.code).json(response);
        }
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = validateRequest;
