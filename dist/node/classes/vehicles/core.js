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
const v_1 = require("../../models/vehicles/v");
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
    listVehicles({ isActive, isApproved, regPlate, vin, sourceId, externalId, fullResponse, maxRecords, }) {
        return __asyncGenerator(this, arguments, function* listVehicles_1() {
            var e_1, _a;
            let count = 0;
            let params = {};
            isActive ? (params = Object.assign(Object.assign({}, params), { isActive: isActive })) : null;
            isApproved ? (params = Object.assign(Object.assign({}, params), { isApproved: isApproved })) : null;
            vin ? (params = Object.assign(Object.assign({}, params), { vin: String(vin) })) : null;
            regPlate ? (params = Object.assign(Object.assign({}, params), { regPlate: String(regPlate) })) : null;
            sourceId ? (params = Object.assign(Object.assign({}, params), { sourceId: String(sourceId) })) : null;
            externalId ? (params = Object.assign(Object.assign({}, params), { externalId: String(externalId) })) : null;
            fullResponse ? (params = Object.assign(Object.assign({}, params), { full: fullResponse ? "true" : "false" })) : null;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `registered-vehicles`,
                    params: params,
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
            let data = Object.assign(Object.assign({}, vehicle), { vehicleId: vehicle.vehicle.id });
            delete data.vehicle;
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `registered-vehicles`,
                data: data,
                params: {
                    webhook: sendWebhook ? "true" : "false",
                },
            });
            let rv = new rv_1.Vehicle(raw);
            rv.api = this.api;
            try {
                if (driverId) {
                    if (!drv) {
                        yield rv.addDriver({
                            driverId,
                            displayName: vehicle.getDisplay(),
                            isOwner: true,
                            isPrimaryDriver: true,
                        });
                    }
                    else {
                        yield rv.addDrv({
                            driverId,
                            drv,
                        });
                    }
                }
            }
            catch (e) {
                console.error(e);
                // await rv.delete();
                throw e;
            }
            return rv;
        });
    }
    listVehicleTypes({ brand, model, vehicleName, year, externalId, sourceId, isActive = true, internalFields, maxRecords, }) {
        return __asyncGenerator(this, arguments, function* listVehicleTypes_1() {
            var e_2, _a;
            let count = 0;
            let params = {};
            brand ? (params = Object.assign(Object.assign({}, params), { brand: String(brand) })) : null;
            model ? (params = Object.assign(Object.assign({}, params), { model: String(model) })) : null;
            vehicleName ? (params = Object.assign(Object.assign({}, params), { vehicleName: String(vehicleName) })) : null;
            year ? (params = Object.assign(Object.assign({}, params), { year: String(year) })) : null;
            externalId ? (params = Object.assign(Object.assign({}, params), { externalId: String(externalId) })) : null;
            sourceId ? (params = Object.assign(Object.assign({}, params), { sourceId: String(sourceId) })) : null;
            isActive ? (params = Object.assign(Object.assign({}, params), { isActive: isActive })) : null;
            internalFields ? (params = Object.assign(Object.assign({}, params), { internalFields: internalFields })) : null;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `vehicles`,
                    params: params,
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    if (maxRecords && count >= maxRecords) {
                        break;
                    }
                    let instance = new v_1.VehicleType(raw);
                    instance.api = this.api;
                    yield yield __await(instance);
                    count++;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    createVehicleType({ vehicleType, sendWebhook }) {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `vehicles`,
                data: vehicleType,
                params: {
                    webhook: sendWebhook ? "true" : "false",
                },
            });
            let instance = new v_1.VehicleType(raw);
            instance.api = this.api;
            return instance;
        });
    }
    getVehicleType({ vehicleTypeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `vehicles/${vehicleTypeId}`,
            });
            let instance = new v_1.VehicleType(raw);
            instance.api = this.api;
            return instance;
        });
    }
}
exports.Vehicles = Vehicles;
//# sourceMappingURL=core.js.map