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
}
exports.Driver = Driver;
//# sourceMappingURL=index.js.map