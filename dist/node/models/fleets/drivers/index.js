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
exports.FleetDriver = void 0;
const __1 = require("..");
const custom_1 = require("../../custom");
class FleetDriver extends custom_1.PrivateApiHandler {
    constructor(assignment) {
        super();
        Object.assign(this, assignment);
    }
    id() {
        var _a;
        return (_a = this.driver) === null || _a === void 0 ? void 0 : _a.id;
    }
    fullName() {
        var _a;
        return (_a = this.driver) === null || _a === void 0 ? void 0 : _a.fullName();
    }
    telemaicsId() {
        return this.sourceId;
    }
    getFleet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fleetId) {
                return null;
            }
            let raw = yield this.api.request({
                method: "GET",
                endpoint: `fleets/${this.fleetId}`,
            });
            let instance = new __1.Fleet(raw);
            if (this.api) {
                instance.api = this.api;
            }
            return instance;
        });
    }
}
exports.FleetDriver = FleetDriver;
//# sourceMappingURL=index.js.map