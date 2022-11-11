"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIAuthError = exports.APIError = void 0;
class APIError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIError";
    }
}
exports.APIError = APIError;
class APIAuthError extends APIError {
    constructor(message) {
        super(message);
        this.name = "APIAuthError";
    }
}
exports.APIAuthError = APIAuthError;
//# sourceMappingURL=exceptions.js.map