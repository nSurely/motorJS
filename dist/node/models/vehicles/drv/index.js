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
exports.DriverVehicle = void 0;
const rv_1 = require("../rv");
const custom_1 = require("../../custom");
class DriverVehicle extends custom_1.PrivateApiHandler {
    constructor(vehicle) {
        super();
        vehicle.registeredVehicle = vehicle.registeredVehicle ? new rv_1.Vehicle(vehicle.registeredVehicle) : undefined;
        Object.assign(this, vehicle);
    }
    _checkId() {
        if (!this.id) {
            throw new Error("ID must be set");
        }
    }
    getDisplay() {
        var _a;
        if (this.registeredVehicle) {
            return `${this.displayName} ${(_a = this.registeredVehicle) === null || _a === void 0 ? void 0 : _a.getDisplay()}`;
        }
        else {
            return this.displayName || "Unknown";
        }
    }
    telematicsId() {
        return this.sourceId;
    }
    create({ driverId, registeredVehicleId }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!registeredVehicleId) {
                if (!((_a = this.registeredVehicle) === null || _a === void 0 ? void 0 : _a.regPlate) || !((_c = (_b = this.registeredVehicle) === null || _b === void 0 ? void 0 : _b.vehicle) === null || _c === void 0 ? void 0 : _c.id)) {
                    throw new Error("To created a DRV either registeredVehicleId should be provided or driverVehicle.registeredVehicle must have regPlate and registeredVehicle.vehicle (vehicle type) must have an ID");
                }
            }
            let data = Object.assign({}, this);
            if (registeredVehicleId) {
                data = Object.assign(Object.assign({}, data), { registeredVehicleId: registeredVehicleId });
                //remove the registeredVehicle object if it exists
                delete data.registeredVehicle;
            }
            return yield this.api.request({
                method: "POST",
                endpoint: `drivers/${driverId}/vehicles`,
                data: Object.assign(Object.assign({}, this), { registeredVehicleId: registeredVehicleId }),
            });
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
            });
            raw.registeredVehicle = raw.registeredVehicle ? new rv_1.Vehicle(raw.registeredVehicle) : undefined;
            raw.api = this.api;
            Object.assign(this, raw);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            yield this.api.request({
                method: "DELETE",
                endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
            });
        });
    }
    save(fields = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            yield this._save({
                endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
                fields: fields,
                exclude: ["driverId", "vehicle"],
            });
        });
    }
    update({ persist = false, fields = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._update({
                endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
                persist: persist,
                fields: fields,
                exclude: ["driverId", "vehicle"],
            });
        });
    }
}
exports.DriverVehicle = DriverVehicle;
//# sourceMappingURL=index.js.map