import { DriverRegisteredVehicleBase } from "./interface";
import { RiskBase } from "../../risk/interface";
import { PolicyBase } from "../../policy/interface";
import { DriverBase } from "../../drivers/interface";
import { Vehicle } from "../rv";
import { PrivateApiHandler } from "../../custom";
export declare class DriverVehicle extends PrivateApiHandler {
    driverId?: string;
    apiPath?: string;
    externalId?: string;
    displayName?: string;
    isApproved?: boolean;
    approvedAt?: Date;
    isOwner?: boolean;
    isDefault?: boolean;
    isActive?: boolean;
    isPrimaryDriver?: boolean;
    expiresAt?: Date;
    risk?: RiskBase;
    id?: string;
    sourceId?: string;
    createdAt?: Date;
    proofOfOwnershipLoc?: string;
    distance3m?: number;
    policies?: PolicyBase[];
    driver?: DriverBase;
    registeredVehicle?: Vehicle;
    constructor(vehicle: DriverRegisteredVehicleBase);
    private _checkId;
    getDisplay(): string;
    telematicsId(): string | undefined;
    create({ driverId, registeredVehicleId }: {
        driverId: string;
        registeredVehicleId?: string;
    }): Promise<any>;
    refresh(): Promise<void>;
    delete(): Promise<void>;
    save(fields?: Object): Promise<void>;
    update({ persist, fields }: {
        persist?: boolean;
        fields?: Object;
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map