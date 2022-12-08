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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const custom_1 = require("../custom");
const accounts_1 = require("../billing/accounts");
const drv_1 = require("../vehicles/drv");
const policy_1 = require("../policy");
const events_1 = require("../billing/events");
class Driver extends custom_1.PrivateApiHandler {
    constructor(driver) {
        super();
        Object.assign(this, driver);
    }
    _checkId() {
        if (!this.id) {
            throw new Error("ID must be set");
        }
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    // Refresh all the properties of this class
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.id}`,
                params: {
                    risk: true,
                    address: true,
                    fleets: true,
                    vehicleCount: true,
                    distance: true,
                    points: true,
                    files: true,
                    contact: true,
                    occupation: true,
                },
            });
            raw.api = this.api;
            Object.assign(this, raw);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            yield this.api.request({
                method: "DELETE",
                endpoint: `drivers/${this.id}`,
            });
        });
    }
    save(fields = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            yield this._save({
                endpoint: `drivers/${this.id}`,
                fields: fields,
                exclude: ["fleets", "createdAt"],
            });
        });
    }
    update({ persist = false, fields = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._update({
                endpoint: `drivers/${this.id}`,
                persist: persist,
                fields: fields,
                exclude: ["fleets", "createdAt"],
            });
        });
    }
    listVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.id}/vehicles`,
            });
            return raw.map((vehicle) => {
                let instance = new drv_1.DriverVehicle(vehicle);
                instance.api = this.api;
                return instance;
            });
        });
    }
    getDisplay() {
        return this.fullName();
    }
    telematicsId() {
        return this.sourceId;
    }
    listBillingAccounts(primaryOnly = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.id}/billing-accounts`,
            });
            return raw.map((billingAccount) => {
                let instance = new accounts_1.BillingAccount(billingAccount);
                instance.api = this.api;
                return instance;
            });
        });
    }
    getBillingAccount({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            if (!id) {
                throw new Error("Billing account id is required");
            }
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.id}/billing-accounts/${id}`,
            });
            let instance = new accounts_1.BillingAccount(raw);
            instance.api = this.api;
            return instance;
        });
    }
    listVehiclePolicies({ vehicleId }) {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `policy`,
                params: {
                    drvIds: vehicleId,
                },
            });
            return raw.map((policy) => {
                let instance = new policy_1.Policy(policy);
                instance.api = this.api;
                return instance;
            });
        });
    }
    getPrimaryBillingAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.listBillingAccounts(true);
            if (res.length > 0 && res[0].id) {
                return yield this.getBillingAccount({ id: res[0].id });
            }
        });
    }
    createBillingAccount({ account }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `drivers/${this.id}/billing-accounts`,
                params: account,
            });
            let instance = new accounts_1.BillingAccount(raw);
            instance.api = this.api;
            return instance;
        });
    }
    charge({ amount, event }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!amount && !event) {
                throw new Error("Either amount or event is required");
            }
            if (!event) {
                event = new events_1.BillingEvent({
                    amount: amount,
                    message: "Charge",
                    type: "other",
                });
            }
            this._checkId();
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `drivers/${this.id}/billing-events`,
                params: event,
            });
            let instance = new events_1.BillingEvent(raw);
            instance.api = this.api;
            return instance;
        });
    }
    listCharges({ eventType, eventStatus, maxRecords }) {
        return __asyncGenerator(this, arguments, function* listCharges_1() {
            var _a, e_1, _b, _c;
            this._checkId();
            let params = {};
            if (eventType) {
                params.type = eventType;
            }
            if (eventStatus) {
                params.status = eventStatus;
            }
            let count = 0;
            try {
                for (var _d = true, _e = __asyncValues(this.api.batchFetch({
                    endpoint: `drivers/${this.id}/billing-events`,
                    params: params,
                })), _f; _f = yield __await(_e.next()), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        let raw = _c;
                        if (maxRecords && count >= maxRecords) {
                            break;
                        }
                        let instance = new events_1.BillingEvent(raw);
                        instance.api = this.api;
                        yield yield __await(instance);
                        count += 1;
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    listPolicies({ looseMatch = true, isActivePolicy }) {
        return __asyncGenerator(this, arguments, function* listPolicies_1() {
            var _a, e_2, _b, _c;
            let params = {};
            params.driverIds = this.id;
            params.driverLooseMatch = looseMatch;
            if (isActivePolicy) {
                params.isActivePolicy = isActivePolicy;
            }
            try {
                for (var _d = true, _e = __asyncValues(this.api.batchFetch({
                    endpoint: `policy`,
                    params: params,
                })), _f; _f = yield __await(_e.next()), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        let raw = _c;
                        let instance = new policy_1.Policy(raw);
                        instance.api = this.api;
                        yield yield __await(instance);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    createPolicy({ policy }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!policy) {
                policy = new policy_1.Policy({
                    policyGroup: "d",
                });
            }
            policy.api = this.api;
            return yield policy.create({
                api: this.api,
                recordId: this.id,
            });
        });
    }
}
exports.Driver = Driver;
//# sourceMappingURL=index.js.map