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
exports.Vehicles = void 0;
const rv_1 = require("../../models/vehicles/rv");
class Vehicles {
    getVehicle({ vehicleId, includeTranslations = true, includeDistance = true, includeDrvCount = true, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                drv: true,
                trns: includeTranslations,
                distance3m: includeDistance,
                totalDrvCount: includeDrvCount,
            };
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `registered-vehicles/${vehicleId}`,
                params,
            });
            let instance = new rv_1.Vehicle(raw);
            instance.api = this.api;
            return instance;
        });
    }
    listVehicles({ regPlate, vin, isActive, isApproved, fullResponse, maxRecords, }) {
        return __asyncGenerator(this, arguments, function* listVehicles_1() {
            var e_1, _a;
            let count = 0;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `registered-vehicles`,
                    params: {
                        regPlate,
                        vin,
                        isActive,
                        isApproved,
                        full: fullResponse ? "true" : "false",
                    },
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    if (maxRecords && count >= maxRecords) {
                        break;
                    }
                    let instance = new rv_1.Vehicle(raw);
                    instance.api = this.api;
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
    createVehicle({ vehicle, driverId, drv, sendWebhook = true }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!driverId && drv) {
                throw new Error("You must provide a driverId if drv is provided");
            }
            if (!vehicle.vehicle) {
                throw new Error("You must provide a vehicleType");
            }
            if (!((_a = vehicle.vehicle) === null || _a === void 0 ? void 0 : _a.id)) {
                throw new Error("Vehicle Type ID is required");
            }
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `registered-vehicles`,
                data: Object.assign(Object.assign({}, vehicle), { vehicleId: vehicle.vehicle.id }),
                params: {
                    webhook: sendWebhook ? "true" : "false",
                },
            });
            let instance = new rv_1.Vehicle(raw);
            return instance;
        });
    }
}
exports.Vehicles = Vehicles;
//# sourceMappingURL=core.js.map