import { DriverBase } from "../../drivers/interface";
import { RegisteredVehicleBase } from "../../vehicles/rv/interface";
export interface FleetDriverVehicleAssignementBase {
    isActive?: boolean;
    expiresAt?: Date;
    createdAt?: Date;
    sourceId?: string;
    assigned?: boolean;
    driver?: DriverBase;
    registeredVehicle?: RegisteredVehicleBase;
}
//# sourceMappingURL=interface.d.ts.map