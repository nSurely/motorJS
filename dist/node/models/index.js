"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drivers_1 = require("./drivers");
const accounts_1 = require("./billing/accounts");
const events_1 = require("./billing/events");
const policy_1 = require("./policy");
const drv_1 = require("./vehicles/drv");
const rv_1 = require("./vehicles/rv");
const v_1 = require("./vehicles/v");
let models = {
    Driver: drivers_1.Driver,
    BillingAccount: accounts_1.BillingAccount,
    BillingEvent: events_1.BillingEvent,
    Policy: policy_1.Policy,
    DriverVehicle: drv_1.DriverVehicle,
    Vehicle: rv_1.Vehicle,
    VehicleType: v_1.VehicleType,
};
exports.default = models;
//# sourceMappingURL=index.js.map