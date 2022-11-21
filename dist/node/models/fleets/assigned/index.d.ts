import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { Driver } from "../../drivers";
import { Vehicle } from "../../vehicles/rv";
import { FleetDriverVehicleAssignementBase } from "./interface";
export declare class FleetDriverVehicleAssignment extends PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    isActive?: boolean;
    expiresAt?: Date;
    createdAt?: Date;
    sourceId?: string;
    assigned?: boolean;
    driver?: Driver;
    registeredVehicle?: Vehicle;
    constructor(assignment: FleetDriverVehicleAssignementBase);
    id(): (string | undefined)[];
    telemaicsId(): string | undefined;
}
//# sourceMappingURL=index.d.ts.map