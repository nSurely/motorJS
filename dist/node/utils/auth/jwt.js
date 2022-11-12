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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuth = void 0;
const request_1 = __importDefault(require("../helpers/request"));
const types_1 = require("../../models/types");
class JWTAuth {
    constructor({ url, region, orgId, authType, email, password }) {
        this.url = url;
        this.region = region;
        this.orgId = orgId;
        this.authType = authType;
        this.email = email;
        this.password = password;
        this.tokenType = undefined;
        this.accessToken = undefined;
        this.expiresIn = undefined;
        this.refreshToken = undefined;
        this.refreshExpiresIn = undefined;
        this.lastRefreshTime = undefined;
        this.accountId = undefined;
        this.accountType = undefined;
        this.orgs = [];
        if (this.authType !== "driver" && this.authType !== "user") {
            throw new Error("Invalid authType. Must be 'driver' or 'user'");
        }
        if (this.url) {
            // Remove trailing slash
            if (this.url.endsWith("/")) {
                this.url = this.url.slice(0, -1);
            }
        }
        if (!this.url) {
            // Check if region is valid
            if (region && !Object.values(types_1.regions).includes(region)) {
                throw new Error(`Invalid region. Must be one of: ${Object.values(types_1.regions).join(", ")}`);
            }
            // Set url based on region
            this.url = `https://${this.region}.nsurely-motor.com/v1/api`;
        }
        if (this.authType === "user") {
            this.loginUrl = `${this.url}/org/auth/users/login`;
            this.refreshUrl = `${this.url}/org/auth/users/refresh`;
            this.logoutUrl = `${this.url}/org/auth/users/logout`;
        }
        else if (this.authType === "driver") {
            this.loginUrl = `${this.url}/org/${this.orgId}/auth/drivers/login`;
            this.refreshUrl = `${this.url}/org/${this.orgId}/auth/drivers/refresh`;
            this.logoutUrl = `${this.url}/org/${this.orgId}/auth/drivers/logout`;
        }
        else {
            throw new Error("Invalid authType. Must be 'driver' or 'user'");
        }
    }
    refreshExpired() {
        if (!this.lastRefreshTime) {
            return true;
        }
        if (!this.refreshExpiresIn) {
            return true;
        }
        // Check if refresh token is expired
        if (this.refreshExpiresIn - (Date.now() - this.lastRefreshTime) < 0) {
            return true;
        }
        return false;
    }
    requiresRefresh() {
        if (!this.accessToken) {
            return true;
        }
        if (!this.expiresIn) {
            return true;
        }
        if (!this.lastRefreshTime) {
            return true;
        }
        if (this.expiresIn - (Date.now() - this.lastRefreshTime) < 0) {
            return true;
        }
        return false;
    }
    login(email, password) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, request_1.default)({
                method: "POST",
                url: this.loginUrl,
                data: {
                    email: email,
                    password: password,
                },
            });
            this.tokenType = (_a = response.body) === null || _a === void 0 ? void 0 : _a.tokenType;
            this.accessToken = (_b = response.body) === null || _b === void 0 ? void 0 : _b.accessToken;
            this.expiresIn = (_c = response.body) === null || _c === void 0 ? void 0 : _c.expiresIn;
            this.refreshToken = (_d = response.body) === null || _d === void 0 ? void 0 : _d.refreshToken;
            this.refreshExpiresIn = (_e = response.body) === null || _e === void 0 ? void 0 : _e.refreshExpiresIn;
            this.accountId = (_f = response.body) === null || _f === void 0 ? void 0 : _f.accountId;
            this.accountType = (_g = response.body) === null || _g === void 0 ? void 0 : _g.accountType;
            if (this.authType === "user") {
                this.orgs = (_h = response.body) === null || _h === void 0 ? void 0 : _h.orgs;
            }
            this.lastRefreshTime = Date.now();
            return this.accessToken;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isLoggedIn()) {
                yield (0, request_1.default)({
                    method: "POST",
                    url: this.logoutUrl,
                    data: {
                        refreshToken: this.refreshToken,
                    },
                });
                this.accessToken = undefined;
                this.refreshToken = undefined;
                this.expiresIn = undefined;
                this.refreshExpiresIn = undefined;
                this.lastRefreshTime = undefined;
            }
        });
    }
    isLoggedIn() {
        if (!this.accessToken) {
            return false;
        }
        if (!this.expiresIn) {
            return false;
        }
        if (!this.lastRefreshTime) {
            return false;
        }
        if (!this.refreshExpiresIn) {
            return false;
        }
        if (this.refreshExpiresIn - (Date.now() - this.lastRefreshTime) < 0) {
            return true;
        }
        return true;
    }
    refresh() {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.refreshExpired()) {
                throw new Error("Refresh token expired due to inactivity. Please login again.");
            }
            const response = yield (0, request_1.default)({
                method: "POST",
                url: this.refreshUrl,
                data: {
                    refreshToken: this.refreshToken,
                },
            });
            this.tokenType = (_a = response.body) === null || _a === void 0 ? void 0 : _a.tokenType;
            this.accessToken = (_b = response.body) === null || _b === void 0 ? void 0 : _b.accessToken;
            this.expiresIn = (_c = response.body) === null || _c === void 0 ? void 0 : _c.expiresIn;
            this.refreshToken = (_d = response.body) === null || _d === void 0 ? void 0 : _d.refreshToken;
            this.refreshExpiresIn = (_e = response.body) === null || _e === void 0 ? void 0 : _e.refreshExpiresIn;
            this.accountId = (_f = response.body) === null || _f === void 0 ? void 0 : _f.accountId;
            this.accountType = (_g = response.body) === null || _g === void 0 ? void 0 : _g.accountType;
            this.lastRefreshTime = Date.now();
            return this.accessToken;
        });
    }
    getToken() {
        if (!this.accessToken) {
            throw new Error("No access token or refresh token found. Please login first.");
        }
        return `Bearer ${this.accessToken}`;
    }
    getHeaders() {
        if (!this.accessToken) {
            return {};
        }
        return {
            Authorization: this.getToken(),
        };
    }
}
exports.JWTAuth = JWTAuth;
//# sourceMappingURL=jwt.js.map