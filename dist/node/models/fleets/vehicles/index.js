"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleetVehicle = void 0;
const custom_1 = require("../../custom");
class FleetVehicle extends custom_1.PrivateApiHandler {
    constructor(assignment) {
        super();
        Object.assign(this, assignment);
    }
    id() {
        var _a;
        return (_a = this.registeredVehicle) === null || _a === void 0 ? void 0 : _a.id;
    }
}
exports.FleetVehicle = FleetVehicle;
//# sourceMappingURL=index.js.map