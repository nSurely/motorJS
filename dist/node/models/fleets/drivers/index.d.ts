import { Fleet } from "..";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { Driver } from "../../drivers";
import { FleetDriverBase } from "./interface";
export declare class FleetDriver extends PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    fleetId?: string;
    isVehicleManager?: boolean;
    isDriverManager?: boolean;
    isBillingManager?: boolean;
    isActive?: boolean;
    expiresAt?: Date;
    createdAt?: Date;
    sourceId?: string;
    driver?: Driver;
    constructor(assignment: FleetDriverBase);
    id(): string | undefined;
    fullName(): string | undefined;
    telemaicsId(): string | undefined;
    getFleet(): Promise<Fleet | null>;
}
//# sourceMappingURL=index.d.ts.map