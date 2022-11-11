"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIKeyAuth = void 0;
const exceptions_1 = require("./exceptions");
class APIKeyAuth {
    constructor(key, secret) {
        this.apiKey = key;
        this.apiSecret = secret;
        this.headers = undefined;
        if (!this.apiKey) {
            throw new exceptions_1.APIKeyAuthError("API key is required.");
        }
        if (!this.apiSecret) {
            throw new exceptions_1.APIKeyAuthError("API secret is required.");
        }
        // Strip whitespace from the key and secret
        this.apiKey = this.apiKey.trim();
        this.apiSecret = this.apiSecret.trim();
    }
    requiresRefresh() {
        return false;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    getToken() {
        return `${this.apiKey}:${this.apiSecret}`;
    }
    getHeaders() {
        if (!this.headers) {
            this.headers = {
                Authorization: `apikey ${this.getToken()}`,
            };
        }
        return this.headers;
    }
    isLoggedIn() {
        return true;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
exports.APIKeyAuth = APIKeyAuth;
//# sourceMappingURL=apiKey.js.map