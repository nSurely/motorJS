import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { PrivateApiHandler } from "../custom";
import { Policy } from "../policy";
import { RiskBase } from "../risk/interface";
import { FleetDriverVehicleAssignment } from "./assigned";
import { FleetDriver } from "./drivers";
import { FleetsBase } from "./interface";
import { FleetVehicle } from "./vehicles";
export declare class Fleet extends PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    apiPath?: string;
    externalId?: string;
    display?: string;
    description?: string;
    tags?: string;
    isActive?: boolean;
    requiresDriverAssignment?: boolean;
    basePremiumBillingProc?: string;
    ratesBillingProc?: string;
    parentId?: string;
    id?: string;
    createdAt?: Date;
    translations?: Object;
    risk?: RiskBase;
    vehicleCount?: number;
    driverCount?: number;
    constructor(fleet: FleetsBase);
    private getTranslations;
    getDisplay({ lang }: {
        lang: string;
    }): any;
    getDescription({ lang }: {
        lang: string;
    }): any;
    hasParent(): boolean;
    getTags(): string[];
    private checkId;
    refresh(): Promise<void>;
    delete(): Promise<void>;
    save(fields?: Object): Promise<any>;
    update({ persist, fields }: {
        persist?: boolean;
        fields?: Object;
    }): Promise<any>;
    getParent(): Promise<Fleet | null>;
    /**
     * Driver operations
     */
    addDriver({ driverId, isVehicleManager, isDriverManager, isBillingManager, expiresAt, isActive, vehicleIds, vehicleExpiresAt, }: {
        driverId: string;
        isVehicleManager?: boolean;
        isDriverManager?: boolean;
        isBillingManager?: boolean;
        expiresAt?: Date;
        isActive?: boolean;
        vehicleIds?: string[];
        vehicleExpiresAt?: Date[] | Date;
    }): Promise<FleetDriver>;
    removeDriver({ driverId }: {
        driverId: string;
    }): Promise<void>;
    getDriver(): Promise<FleetDriver>;
    updateDriver({ driverId, isVehicleManager, isDriverManager, isBillingManager, expiresAt, isActive, }: {
        driverId: string;
        isVehicleManager?: boolean;
        isDriverManager?: boolean;
        isBillingManager?: boolean;
        expiresAt?: Date;
        isActive?: boolean;
    }): Promise<FleetDriver>;
    listDrivers(): AsyncIterableIterator<FleetDriver>;
    /**
     * Vehicle operations
     */
    addVehicle({ vehicleId, isActive, isOpenToAll }: {
        vehicleId: string;
        isActive?: boolean;
        isOpenToAll?: boolean;
    }): Promise<FleetVehicle>;
    removeVehicle({ vehicleId }: {
        vehicleId: string;
    }): Promise<void>;
    updateVehicle({ vehicleId, isActive, isOpenToAll }: {
        vehicleId: string;
        isActive?: boolean;
        isOpenToAll?: boolean;
    }): Promise<FleetVehicle>;
    listVehicles(): AsyncIterableIterator<FleetVehicle>;
    /**
     * driver to vehicle assignment operations
     */
    addDriverToVehicle({ driverId, vehicleId, expiresAt, isActive }: {
        driverId: string;
        vehicleId: string;
        expiresAt?: Date;
        isActive?: boolean;
    }): Promise<FleetDriverVehicleAssignment>;
    removeDriverFromVehicle({ driverId, vehicleId }: {
        driverId: string;
        vehicleId: string;
    }): Promise<void>;
    updateDriverVehicleAssignment({ driverId, vehicleId, expiresAt, isActive }: {
        driverId: string;
        vehicleId: string;
        expiresAt?: Date;
        isActive?: boolean;
    }): Promise<void>;
    listDriverVehicleAssignments({ driverId, includeUnassigned, }: {
        driverId: string;
        includeUnassigned?: boolean;
    }): AsyncIterableIterator<FleetDriverVehicleAssignment>;
    /**
     * policy operations
     */
    listPolicies(): AsyncIterableIterator<Policy>;
}
//# sourceMappingURL=index.d.ts.map