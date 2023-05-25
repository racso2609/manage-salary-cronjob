"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const crypto = require("crypto");
const generateSignature = (query, secret) => {
    return crypto.createHmac("sha256", secret).update(query).digest("hex");
};
exports.generateSignature = generateSignature;
//# sourceMappingURL=index.js.map