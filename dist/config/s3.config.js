"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: 'process.env.ACCESS_KEY_ID',
        secretAccessKey: 'process.env.SECRET_ACCESS_KEY'
    },
    region: 'process.env.BUCKET_REGION'
});
exports.default = s3;
