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
exports.Auth = void 0;
const exceptions_1 = require("./exceptions");
const apiKey_1 = require("./apiKey");
const driver_1 = require("./driver");
const user_1 = require("./user");
const types_1 = require("../../models/types");
var AuthType;
(function (AuthType) {
    AuthType[AuthType["API_KEY"] = 1] = "API_KEY";
    AuthType[AuthType["JWT_DRIVER"] = 2] = "JWT_DRIVER";
    AuthType[AuthType["JWT_USER"] = 3] = "JWT_USER";
})(AuthType || (AuthType = {}));
class Auth {
    constructor({ apiKey, apiSecret, email, password, accountType, orgId, region, url, }) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
        this.region = region;
        this.url = url;
        this.orgId = orgId;
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
        if (this.apiKey) {
            if (!this.apiSecret) {
                // Check if apiSecret does not have ':' in it
                if (this.apiKey.indexOf(":") === -1) {
                    throw new exceptions_1.AuthError('Invalid API key. API key must be in the format "key:secret".');
                }
                // Split the apiSecret into key and secret
                [this.apiKey, this.apiSecret] = this.apiKey.split(":");
            }
            this.authMethod = AuthType.API_KEY;
            this.authObject = new apiKey_1.APIKeyAuth(this.apiKey, this.apiSecret);
        }
        else if (this.email && this.password) {
            if (!this.accountType) {
                throw new exceptions_1.AuthError("Account type must be specified.");
            }
            if (this.accountType === "driver") {
                console.log("Auth object is driver");
                this.authMethod = AuthType.JWT_DRIVER;
                this.authObject = new driver_1.DriverAuth({
                    email: this.email,
                    password: this.password,
                    url: this.url,
                    region: this.region,
                    orgId: this.orgId,
                    authType: this.accountType,
                });
            }
            else if (this.accountType === "user") {
                this.authMethod = AuthType.JWT_USER;
                this.authObject = new user_1.UserAuth({
                    email: this.email,
                    password: this.password,
                    url: this.url,
                    region: this.region,
                    orgId: this.orgId,
                    authType: this.accountType,
                });
            }
            else {
                throw new exceptions_1.AuthError("Invalid account type.");
            }
        }
        else {
            throw new exceptions_1.AuthError("Auth credentials are missing.");
        }
    }
    requiresRefresh() {
        return this.authObject.requiresRefresh();
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authObject.refresh();
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.authMethod === AuthType.API_KEY) {
                return true;
            }
            if (this.email && this.password) {
                console.log("Logging in...");
                return yield this.authObject.login(this.email, this.password);
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authObject.logout();
        });
    }
    getToken() {
        return this.authObject.getToken();
    }
    getHeaders() {
        return this.authObject.getHeaders();
    }
    isLoggedIn() {
        return this.authObject.isLoggedIn();
    }
}
exports.Auth = Auth;
//# sourceMappingURL=core.js.map