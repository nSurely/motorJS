import { PolicyBase } from "../../policy/interface";
import { RiskBase } from "../../risk/interface";
import { VehicleTypeBase } from "../v/interface";
import { DriverRegisteredVehicleBase } from "../drv/interface";

export interface RegisteredVehicleBase {
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
	vehicle?: VehicleTypeBase;
	driverVehicles?: DriverRegisteredVehicleBase[];
}

export interface Translations {
	display?: Brand;
	variant?: Brand;
	brand?: Brand;
	model?: Brand;
}

export interface Brand {}
