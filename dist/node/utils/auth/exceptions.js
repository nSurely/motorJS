"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUserAuthError = exports.JWTDriverAuthError = exports.APIKeyAuthError = exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
    }
}
exports.AuthError = AuthError;
class APIKeyAuthError extends AuthError {
    constructor(message) {
        super(message);
        this.name = "APIKeyAuthError";
    }
}
exports.APIKeyAuthError = APIKeyAuthError;
class JWTDriverAuthError extends AuthError {
    constructor(message) {
        super(message);
        this.name = "JWTDriverAuthError";
    }
}
exports.JWTDriverAuthError = JWTDriverAuthError;
class JWTUserAuthError extends AuthError {
    constructor(message) {
        super(message);
        this.name = "JWTUserAuthError";
    }
}
exports.JWTUserAuthError = JWTUserAuthError;
//# sourceMappingURL=exceptions.js.map