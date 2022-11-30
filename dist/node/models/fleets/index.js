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
exports.Fleet = void 0;
const custom_1 = require("../custom");
const policy_1 = require("../policy");
const types_1 = require("../types");
const assigned_1 = require("./assigned");
const drivers_1 = require("./drivers");
const vehicles_1 = require("./vehicles");
class Fleet extends custom_1.PrivateApiHandler {
    constructor(fleet) {
        super();
        Object.assign(this, fleet);
    }
    getTranslations({ key, lang }) {
        var _a, _b;
        if (!lang) {
            return this[key];
        }
        if (!types_1.LANG.includes(lang)) {
            throw new Error(`${lang} is not a valid language code`);
        }
        const val = (_b = (_a = this.translations) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b[lang];
        if (val) {
            return val;
        }
        return this[key];
    }
    getDisplay({ lang }) {
        return this.getTranslations({ key: "display", lang });
    }
    getDescription({ lang }) {
        return this.getTranslations({ key: "description", lang });
    }
    hasParent() {
        return !!this.parentId;
    }
    getTags() {
        var _a;
        return ((_a = this.tags) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    }
    checkId() {
        if (!this.id) {
            throw new Error("Fleet ID is required");
        }
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkId();
            const fleet = yield this.api.request({
                method: "GET",
                endpoint: `/fleets/${this.id}`,
            });
            Object.assign(this, fleet);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkId();
            yield this.api.request({
                method: "DELETE",
                endpoint: `/fleets/${this.id}`,
            });
        });
    }
    save(fields = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkId();
            return yield this._save({
                endpoint: `/fleets/${this.id}`,
                fields,
                exclude: ["vehicleType"],
            });
        });
    }
    update({ persist, fields }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (persist) {
                return yield this.save(fields);
            }
            return yield this._update({ fields });
        });
    }
    getParent() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasParent()) {
                return null;
            }
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `/fleets/${this.parentId}`,
            });
            let instance = new Fleet(raw);
            instance.api = this.api;
            return instance;
        });
    }
    /**
     * Driver operations
     */
    addDriver({ driverId, isVehicleManager = false, isDriverManager = false, isBillingManager = false, expiresAt, isActive = true, vehicleIds, vehicleExpiresAt, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!vehicleIds) {
                vehicleIds = [];
            }
            let data = {
                driverId,
                isVehicleManager,
                isDriverManager,
                isBillingManager,
                isActive,
            };
            if (expiresAt === null || expiresAt === void 0 ? void 0 : expiresAt.toISOString()) {
                data.expiresAt = expiresAt.toISOString();
            }
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `/fleets/${this.id}/drivers`,
                data,
            });
            let fleetDriver = new drivers_1.FleetDriver(raw);
            fleetDriver.api = this.api;
            if (!vehicleIds.length) {
                return fleetDriver;
            }
            try {
                //loop throught vehicleIds
                if (vehicleExpiresAt instanceof Date || !vehicleExpiresAt) {
                    for (let vehicleId of vehicleIds) {
                        let data = {};
                        if (vehicleExpiresAt === null || vehicleExpiresAt === void 0 ? void 0 : vehicleExpiresAt.toISOString()) {
                            data.expiresAt = vehicleExpiresAt.toISOString();
                        }
                        yield this.api.request({
                            method: "POST",
                            endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
                            data: data,
                        });
                    }
                    return fleetDriver;
                }
                vehicleIds.forEach((vehicleId, index) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    let data = {};
                    if ((_a = vehicleExpiresAt[index]) === null || _a === void 0 ? void 0 : _a.toISOString()) {
                        data.expiresAt = vehicleExpiresAt[index].toISOString();
                    }
                    yield this.api.request({
                        method: "POST",
                        endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
                        data: data,
                    });
                }));
            }
            catch (e) {
                //if error, remove driver
                yield this.api.request({
                    method: "DELETE",
                    endpoint: `/fleets/${this.id}/drivers/${driverId}`,
                });
                throw e;
            }
            return fleetDriver;
        });
    }
    removeDriver({ driverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.request({
                method: "DELETE",
                endpoint: `/fleets/${this.id}/drivers/${driverId}`,
            });
        });
    }
    getDriver() {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `/fleets/${this.id}/drivers`,
            });
            let fleetDriver = new drivers_1.FleetDriver(raw);
            fleetDriver.api = this.api;
            return fleetDriver;
        });
    }
    updateDriver({ driverId, isVehicleManager, isDriverManager, isBillingManager, expiresAt, isActive, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            if (isVehicleManager !== undefined) {
                data.isVehicleManager = isVehicleManager;
            }
            if (isDriverManager !== undefined) {
                data.isDriverManager = isDriverManager;
            }
            if (isBillingManager !== undefined) {
                data.isBillingManager = isBillingManager;
            }
            if (expiresAt === null || expiresAt === void 0 ? void 0 : expiresAt.toISOString()) {
                data.expiresAt = expiresAt.toISOString();
            }
            if (isActive !== undefined) {
                data.isActive = isActive;
            }
            let raw = yield this.api.request({
                method: "PATCH",
                endpoint: `/fleets/${this.id}/drivers/${driverId}`,
                data,
            });
            let fleetDriver = new drivers_1.FleetDriver(raw);
            fleetDriver.api = this.api;
            return fleetDriver;
        });
    }
    listDrivers() {
        return __asyncGenerator(this, arguments, function* listDrivers_1() {
            var e_1, _a;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `/fleets/${this.id}/drivers`,
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    let fleetDriver = new drivers_1.FleetDriver(raw);
                    fleetDriver.api = this.api;
                    yield yield __await(fleetDriver);
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
    /**
     * Vehicle operations
     */
    addVehicle({ vehicleId, isActive = true, isOpenToAll = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                vehicleId,
                isActive,
                isOpenToAll,
            };
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `/fleets/${this.id}/vehicles`,
                data,
            });
            let fleetVehicle = new vehicles_1.FleetVehicle(raw);
            fleetVehicle.api = this.api;
            return fleetVehicle;
        });
    }
    removeVehicle({ vehicleId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.request({
                method: "DELETE",
                endpoint: `/fleets/${this.id}/vehicles/${vehicleId}`,
            });
        });
    }
    updateVehicle({ vehicleId, isActive, isOpenToAll }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            if (isActive !== undefined) {
                data.isActive = isActive;
            }
            if (isOpenToAll !== undefined) {
                data.isOpenToAll = isOpenToAll;
            }
            let raw = yield this.api.request({
                method: "PATCH",
                endpoint: `/fleets/${this.id}/vehicles/${vehicleId}`,
                data,
            });
            let fleetVehicle = new vehicles_1.FleetVehicle(raw);
            fleetVehicle.api = this.api;
            return fleetVehicle;
        });
    }
    listVehicles() {
        return __asyncGenerator(this, arguments, function* listVehicles_1() {
            var e_2, _a;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `/fleets/${this.id}/vehicles`,
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    let fleetVehicle = new vehicles_1.FleetVehicle(raw);
                    fleetVehicle.api = this.api;
                    yield yield __await(fleetVehicle);
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
    /**
     * driver to vehicle assignment operations
     */
    addDriverToVehicle({ driverId, vehicleId, expiresAt, isActive = true }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                driverId,
                vehicleId,
                isActive,
            };
            if (expiresAt === null || expiresAt === void 0 ? void 0 : expiresAt.toISOString()) {
                data.expiresAt = expiresAt.toISOString();
            }
            let raw = yield this.api.request({
                method: "POST",
                endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles`,
                data,
            });
            let instance = new assigned_1.FleetDriverVehicleAssignment(raw);
            instance.api = this.api;
            return instance;
        });
    }
    removeDriverFromVehicle({ driverId, vehicleId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.request({
                method: "DELETE",
                endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
            });
        });
    }
    updateDriverVehicleAssignment({ driverId, vehicleId, expiresAt, isActive }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            if (expiresAt === null || expiresAt === void 0 ? void 0 : expiresAt.toISOString()) {
                data.expiresAt = expiresAt.toISOString();
            }
            if (isActive !== undefined) {
                data.isActive = isActive;
            }
            yield this.api.request({
                method: "PATCH",
                endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
                data,
            });
        });
    }
    listDriverVehicleAssignments({ driverId, includeUnassigned = true, }) {
        return __asyncGenerator(this, arguments, function* listDriverVehicleAssignments_1() {
            var e_3, _a;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles`,
                    params: {
                        includeUnassigned,
                    },
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    let instance = new assigned_1.FleetDriverVehicleAssignment(raw);
                    instance.api = this.api;
                    yield yield __await(instance);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    /**
     * policy operations
     */
    listPolicies() {
        return __asyncGenerator(this, arguments, function* listPolicies_1() {
            var e_4, _a;
            try {
                for (var _b = __asyncValues(this.api.batchFetch({
                    endpoint: `/policy`,
                    params: {
                        fleetId: this.id,
                    },
                })), _c; _c = yield __await(_b.next()), !_c.done;) {
                    let raw = _c.value;
                    let instance = new policy_1.Policy(raw);
                    instance.api = this.api;
                    yield yield __await(instance);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_4) throw e_4.error; }
            }
        });
    }
}
exports.Fleet = Fleet;
//# sourceMappingURL=index.js.map