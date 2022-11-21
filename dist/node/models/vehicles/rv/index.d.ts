import { RiskBase } from "../../risk/interface";
import { RegisteredVehicleBase } from "./interface";
import { DriverRegisteredVehicleBase } from "../drv/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { PolicyBase } from "../../policy/interface";
import { VehicleType } from "../v";
import { DriverVehicle } from "../drv";
import { Policy } from "../../policy";
export declare class Vehicle extends PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    apiPath?: string;
    externalId?: string;
    regPlate?: string;
    vin?: string;
    year?: number;
    preowned?: boolean;
    isApproved?: boolean;
    approvedAt?: Date;
    onRoadParking?: boolean;
    mileageKm?: number;
    engineLitres?: number;
    fuelType?: string;
    hasTurbo?: boolean;
    hasSupercharger?: boolean;
    bodyModified?: boolean;
    engineModified?: boolean;
    gearboxType?: string;
    isActive?: boolean;
    risk?: RiskBase;
    backgroundCheckStatus?: string;
    backgroundCheckProvider?: string;
    backgroundCheckRawOutput?: string;
    backgroundCheckPassed?: boolean;
    id?: string;
    sourceId?: string;
    createdAt?: Date;
    frontPicLoc?: string;
    sidePicLoc1?: string;
    sidePicLoc2?: string;
    rearPicLoc?: string;
    topPicLoc?: string;
    proofOfRegLoc?: string;
    distance3m?: number;
    totalDrvCount?: number;
    policies?: PolicyBase[];
    vehicle?: VehicleType;
    driverVehicles?: DriverRegisteredVehicleBase[];
    constructor(vehicle: RegisteredVehicleBase);
    private _checkId;
    getDisplay(): string;
    addDrv({ driverId, drv }: {
        driverId: string;
        drv: DriverVehicle;
    }): Promise<any>;
    addDriver({ driverId, displayName, isOwner, isPrimaryDriver }: {
        driverId: string;
        displayName?: string;
        isOwner?: boolean;
        isPrimaryDriver?: boolean;
    }): Promise<any>;
    createPolicy({ policy }: {
        policy: Policy;
    }): Promise<Policy>;
    refresh(): Promise<void>;
    delete(): Promise<void>;
    save(fields?: Object): Promise<void>;
    update({ persist, fields }: {
        persist?: boolean;
        fields?: Object;
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map