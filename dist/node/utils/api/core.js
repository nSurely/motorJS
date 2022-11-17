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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIHandlerAuth = exports.APIHandlerNoAuth = void 0;
const types_1 = require("../../models/types");
const request_1 = __importDefault(require("../helpers/request"));
const exceptions_1 = require("./exceptions");
class APIHandlerNoAuth {
    constructor({ url, region, orgId }) {
        this.url = url;
        this.region = region;
        this.orgId = orgId;
        this.orgDataRefreshing = false;
        if (!this.url && !this.region) {
            throw new Error("Must provide either a url or a region");
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
        this.telematicsUrl = `https://${this.region}.nsurely-motor.com/v1/telematics`;
        this.orgUrl = `${this.url}/org/${this.orgId}`;
    }
    request({ method, endpoint, params, data, headers, urlOverride, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.orgData && !this.orgDataRefreshing) {
                this.orgDataRefreshing = true;
                this.refreshOrgData();
            }
            if (data) {
                data = Object.assign({}, data);
                // check if data has api, remove it
                if (data.api) {
                    delete data.api;
                }
            }
            let { body, status } = yield (0, request_1.default)({
                method,
                url: urlOverride ? urlOverride : `${this.orgUrl}/${endpoint}`,
                params,
                data,
                headers,
            });
            if (status < 300) {
                return body;
            }
            else if (status === 401) {
                throw new exceptions_1.APIAuthError("Not authenticated");
            }
            else {
                throw new exceptions_1.APIError(`Api responded with status code ${status}`);
            }
        });
    }
    refreshOrgData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.orgDataRefreshing = true;
            this.orgData = yield this.request({
                urlOverride: `${this.url}/public/${this.orgId}`,
                method: "GET",
            });
            this.orgDataRefreshing = false;
        });
    }
    batchFetch({ endpoint, params, headers, limit = 50, offset = 0, }) {
        return __asyncGenerator(this, arguments, function* batchFetch_1() {
            params = Object.assign(Object.assign({}, params), { limit,
                offset });
            // While true
            while (true) {
                // Fetch next page
                let body = yield __await(this.request({
                    method: "GET",
                    endpoint,
                    params: Object.assign(Object.assign({}, params), { offset }),
                    headers,
                }));
                // If no data, break
                if (!body || body.length === 0) {
                    break;
                }
                for (let item of body) {
                    yield yield __await(item);
                }
                // If there are no more results, break
                if (body.length < limit) {
                    break;
                }
                // Increase offset
                offset += limit;
            }
        });
    }
}
exports.APIHandlerNoAuth = APIHandlerNoAuth;
class APIHandlerAuth {
    constructor({ url, region, orgId, auth }) {
        this.url = url;
        this.region = region;
        this.orgId = orgId;
        this.auth = auth;
        this.orgDataRefreshing = false;
        if (!this.url && !this.region) {
            throw new Error("Must provide either a url or a region");
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
        this.telematicsUrl = `https://${this.region}.nsurely-motor.com/v1/telematics`;
        this.orgUrl = `${this.url}/org/${this.orgId}`;
    }
    makeRequest({ method, params, data, headers, url }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.auth.requiresRefresh()) {
                yield this.auth.refresh();
            }
            headers = Object.assign(Object.assign({}, headers), this.auth.getHeaders());
            return yield (0, request_1.default)({
                method,
                url: url,
                params,
                data,
                headers,
            });
        });
    }
    refreshOrgData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.orgDataRefreshing = true;
            this.orgData = yield this.request({
                urlOverride: `${this.url}/public/${this.orgId}`,
                method: "GET",
            });
            this.orgDataRefreshing = false;
        });
    }
    authOk() {
        if (!this.auth.isLoggedIn()) {
            return false;
        }
        if (this.auth.requiresRefresh()) {
            return false;
        }
        return true;
    }
    checkAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authOk()) {
                if (!this.auth.isLoggedIn()) {
                    yield this.auth.login();
                    return;
                }
                if (this.auth.requiresRefresh()) {
                    yield this.auth.refresh();
                    return;
                }
            }
            return;
        });
    }
    request({ method, endpoint, params, data, headers, urlOverride, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.orgData && !this.orgDataRefreshing) {
                this.orgDataRefreshing = true;
                yield this.refreshOrgData();
            }
            yield this.checkAuth();
            if (data) {
                data = Object.assign({}, data);
                // check if data has api, remove it
                if (data.api) {
                    delete data.api;
                }
            }
            let response = yield this.makeRequest({
                method,
                url: urlOverride ? urlOverride : `${this.orgUrl}/${endpoint}`,
                params,
                data,
                headers,
            });
            let body = (response === null || response === void 0 ? void 0 : response.body) || {};
            let status = (response === null || response === void 0 ? void 0 : response.status) || 0;
            if (status === 401) {
                yield this.checkAuth();
                headers = Object.assign(Object.assign({}, headers), this.auth.getHeaders());
                let response = yield this.makeRequest({
                    method,
                    url: urlOverride ? urlOverride : `${this.orgUrl}/${endpoint}`,
                    params,
                    data,
                    headers,
                });
                body = (response === null || response === void 0 ? void 0 : response.body) || {};
                status = (response === null || response === void 0 ? void 0 : response.status) || 0;
            }
            if (status < 300) {
                return body;
            }
            else if (status === 401) {
                throw new exceptions_1.APIAuthError("Not authenticated");
            }
            else {
                throw new exceptions_1.APIError(`Api responded with status code ${status}`);
            }
        });
    }
    batchFetch({ endpoint, params, headers, limit = 50, offset = 0, }) {
        return __asyncGenerator(this, arguments, function* batchFetch_2() {
            params = Object.assign(Object.assign({}, params), { limit,
                offset });
            // While true
            while (true) {
                // Fetch next page
                let body = yield __await(this.request({
                    method: "GET",
                    endpoint,
                    params: Object.assign(Object.assign({}, params), { offset }),
                    headers,
                }));
                // If no data, break
                if (!body || body.length === 0) {
                    break;
                }
                for (let item of body) {
                    yield yield __await(item);
                }
                // If there are no more results, break
                if (body.length < limit) {
                    break;
                }
                // Increase offset
                offset += limit;
            }
        });
    }
}
exports.APIHandlerAuth = APIHandlerAuth;
//# sourceMappingURL=core.js.map