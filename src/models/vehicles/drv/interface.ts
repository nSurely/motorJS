import { RiskBase } from "../../risk/interface";
import { PolicyBase } from "../../policy/interface";
import { DriverBase } from "../../drivers/interface";
import { RegisteredVehicleBase } from "../rv/interface";

export interface DriverRegisteredVehicleBase {
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
	registeredVehicle?: RegisteredVehicleBase;
}

export interface DriverRegisteredVehicleWithDriverId extends DriverRegisteredVehicleBase {
    driverId: string;
}
