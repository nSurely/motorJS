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
exports.Vehicle = void 0;
const custom_1 = require("../../custom");
const v_1 = require("../v");
const drv_1 = require("../drv");
const policy_1 = require("../../policy");
class Vehicle extends custom_1.PrivateApiHandler {
    constructor(vehicle) {
        super();
        vehicle.vehicle = vehicle.vehicle ? new v_1.VehicleType(vehicle.vehicle) : undefined;
        Object.assign(this, vehicle);
    }
    _checkId() {
        if (!this.id) {
            throw new Error("ID must be set");
        }
    }
    getDisplay() {
        var _a;
        if (this.vehicle) {
            return `${(_a = this.vehicle) === null || _a === void 0 ? void 0 : _a.getDisplay()} - ${this.regPlate}`;
        }
        else {
            return this.regPlate || "Unknown";
        }
    }
    addDrv({ driverId, drv }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            if (!(drv === null || drv === void 0 ? void 0 : drv.api)) {
                drv.api = this.api;
            }
            return yield drv.create({ driverId: driverId, registeredVehicleId: this.id });
        });
    }
    addDriver({ driverId, displayName, isOwner, isPrimaryDriver }) {
        return __awaiter(this, void 0, void 0, function* () {
            let drv = new drv_1.DriverVehicle({
                displayName: displayName,
                isOwner: isOwner,
                isPrimaryDriver: isPrimaryDriver,
            });
            drv.api = this.api;
            return yield this.addDrv({ driverId: driverId, drv: drv });
        });
    }
    createPolicy({ policy }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!policy) {
                policy = new policy_1.Policy({
                    policyGroup: "rv",
                });
            }
            policy.api = this.api;
            return yield policy.create({
                api: this.api,
                recordId: this.id,
            });
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `registered-vehicles/${this.id}`,
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
                endpoint: `registered-vehicles/${this.id}`,
            });
        });
    }
    save(fields = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            yield this._save({
                endpoint: `registered-vehicles/${this.id}`,
                fields: fields,
                exclude: ["vehicleType"],
            });
        });
    }
    update({ persist = false, fields = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._update({
                endpoint: `vehicles/${this.id}`,
                persist: persist,
                fields: fields,
                exclude: ["vehicleType"],
            });
        });
    }
}
exports.Vehicle = Vehicle;
//# sourceMappingURL=index.js.map