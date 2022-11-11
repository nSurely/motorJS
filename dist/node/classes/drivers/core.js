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
exports.Drivers = void 0;
const drivers_1 = require("../../models/drivers");
class Drivers {
    /**
     * Returns a drivers record.
     * @returns {Promise<Driver>}
     *
     * @param {string} driverId - The ID of the driver to retrieve.
     * @param {boolean} risk - Whether to include the driver's risk data. Defaults to true
     * @param {boolean} address - Whether to include the driver's address data. Defaults to true
     * @param {boolean} fleets - Whether to include the driver's fleet data. Defaults to true
     * @param {boolean} vehicleCount - Whether to include the driver's vehicle count. Defaults to true
     * @param {boolean} distance - Whether to include the driver's distance data. Defaults to true
     * @param {boolean} points - Whether to include the driver's points data. Defaults to true
     * @param {boolean} files - Whether to include the driver's files data. Defaults to true
     * @param {boolean} contact - Whether to include the driver's contact data. Defaults to true
     * @param {boolean} occupation - Whether to include the driver's occupation data. Defaults to true
     */
    getDriver({ driverId, risk = true, address = true, fleets = true, vehicleCount = false, distance = false, points = true, files = true, contact = true, occupation = true, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                risk,
                address,
                fleets,
                vehicleCount,
                distance,
                points,
                files,
                contact,
                occupation,
            };
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${driverId}`,
                params,
            });
            let instance = new drivers_1.Driver(raw);
            instance.api = this.api;
            return instance;
        });
    }
    listDrivers({ dob, email, firstName, lastName, externalId, isActive, maxRecords, }) {
        return __asyncGenerator(this, arguments, function* listDrivers_1() {
            var e_1, _a;
            let count = 0;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `drivers`,
                    params: {
                        dob,
                        email,
                        firstName,
                        lastName,
                        externalId,
                        isActive,
                    },
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    if (maxRecords && count >= maxRecords) {
                        break;
                    }
                    let instance = new drivers_1.Driver(raw);
                    yield yield __await(instance);
                    count++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    createDriver({ driver, password, sendInvite, sendWebhook }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password && !sendInvite) {
                throw new Error("You must provide a password if sendInvite is false");
            }
            if (password && sendInvite) {
                throw new Error("You cannot provide a password if sendInvite is true");
            }
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `drivers`,
                data: Object.assign(Object.assign({}, driver), { password }),
                params: {
                    webhook: sendWebhook ? "true" : "false",
                    invite: sendInvite ? "true" : "false",
                },
            });
            let instance = new drivers_1.Driver(raw);
            return instance;
        });
    }
}
exports.Drivers = Drivers;
//# sourceMappingURL=core.js.map