import { Driver } from "./drivers";
import { BillingAccount } from "./billing/accounts";
import { BillingEvent } from "./billing/events";
import { Policy } from "./policy";
import { DriverVehicle } from "./vehicles/drv";
import { Vehicle } from "./vehicles/rv";
import { VehicleType } from "./vehicles/v";

let models = {
	Driver,
	BillingAccount,
	BillingEvent,
	Policy,
	DriverVehicle,
	Vehicle,
	VehicleType,
};

export default models;
