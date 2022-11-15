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
exports.Driver = void 0;
const custom_1 = require("../custom");
const accounts_1 = require("../billing/accounts");
const drv_1 = require("../vehicles/drv");
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
                endpoint: `vehicles/${this.id}`,
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
            let vehiclesRaw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.id}/vehicles`,
            });
            return vehiclesRaw.map((vehicle) => {
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
            let billingAccountsRaw = yield this.api.request({
                method: "GET",
                endpoint: `drivers/${this.id}/billing-accounts`,
            });
            return billingAccountsRaw.map((billingAccount) => {
                let instance = new accounts_1.BillingAccount(billingAccount);
                instance.api = this.api;
                return instance;
            });
        });
    }
}
exports.Driver = Driver;
//# sourceMappingURL=index.js.map