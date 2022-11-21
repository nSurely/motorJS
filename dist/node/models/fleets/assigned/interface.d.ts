import { Driver } from "../../drivers";
import { Vehicle } from "../../vehicles/rv";
export interface FleetDriverVehicleAssignementBase {
    isActive?: boolean;
    expiresAt?: Date;
    createdAt?: Date;
    sourceId?: string;
    assigned?: boolean;
    driver?: Driver;
    registeredVehicle?: Vehicle;
}
//# sourceMappingURL=interface.d.ts.map