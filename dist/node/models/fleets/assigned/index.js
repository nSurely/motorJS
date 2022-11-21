"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleetDriverVehicleAssignment = void 0;
const custom_1 = require("../../custom");
class FleetDriverVehicleAssignment extends custom_1.PrivateApiHandler {
    constructor(assignment) {
        super();
        Object.assign(this, assignment);
    }
    id() {
        var _a, _b;
        return [(_a = this.driver) === null || _a === void 0 ? void 0 : _a.id, (_b = this.registeredVehicle) === null || _b === void 0 ? void 0 : _b.id];
    }
    telemaicsId() {
        return this.sourceId;
    }
}
exports.FleetDriverVehicleAssignment = FleetDriverVehicleAssignment;
//# sourceMappingURL=index.js.map