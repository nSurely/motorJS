import { Driver } from "./drivers";
import { BillingAccount } from "./billing/accounts";
import { BillingEvent } from "./billing/events";
import { Policy } from "./policy";
import { DriverVehicle } from "./vehicles/drv";
import { Vehicle } from "./vehicles/rv";
import { VehicleType } from "./vehicles/v";
import { Fleet } from "./fleets";
declare let models: {
    Driver: typeof Driver;
    BillingAccount: typeof BillingAccount;
    BillingEvent: typeof BillingEvent;
    Policy: typeof Policy;
    DriverVehicle: typeof DriverVehicle;
    Vehicle: typeof Vehicle;
    VehicleType: typeof VehicleType;
    Fleet: typeof Fleet;
};
export default models;
//# sourceMappingURL=index.d.ts.map