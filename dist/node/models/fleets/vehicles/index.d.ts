import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { Vehicle } from "../../vehicles/rv";
import { FleetVehicleBase } from "./interface";
export declare class FleetVehicle extends PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    isActive?: boolean;
    isOpenToAll?: boolean;
    sourceId?: string;
    createdAt?: Date;
    registeredVehicle?: Vehicle;
    constructor(assignment: FleetVehicleBase);
    id(): string | undefined;
}
//# sourceMappingURL=index.d.ts.map