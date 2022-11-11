import { DamageToVehicle } from "./damageToVehicle/interface";
import { Claimant } from "./claimant/interface";
import { ThirdParty } from "./thirdParty/interface";
import { ConsolidatedMovementBase } from "../trips/interface";

export interface ClaimsBase {
	apiPath?: string;
	rejectedAt?: Date;
	rejectedMessage?: string;
	rejectedByUsersId?: string;
	approvedAt?: Date;
	approvalValuation?: number;
	approvalMessage?: string;
	latitude?: number;
	longitude?: number;
	externalId?: string;
	claimDescription?: string;
	occuredAt?: Date;
	claimantValuation?: number;
	userValuation?: number;
	settledValuation?: number;
	isSettled?: boolean;
	policyId?: string;
	policeAtScene?: boolean;
	ambulanceAtScene?: boolean;
	witnessAtScene?: boolean;
	vehicleStationary?: boolean;
	vehicleReversing?: boolean;
	vehicleUnoccupied?: boolean;
	airbagsDeployed?: boolean;
	passengersInVehicle?: boolean;
	driverNotPolicyHolder?: boolean;
	driverHasInjuries?: boolean;
	damagedPanels?: boolean;
	damagedTyres?: boolean;
	damagedScreens?: boolean;
	policeAgency?: string;
	policeReportNumber?: string;
	damageToVehicle?: DamageToVehicle;
	approachLatitude?: number;
	approachLongitude?: number;
	id?: string;
	createdAt?: Date;
	discoveredAt?: Date;
	supportingPicsLocs?: any[];
	supportingDocsLocs?: any[];
	policeReferenceId?: string;
	policeReportLoc?: string[];
	claimant?: Claimant;
	drv?: Claimant;
	registeredVehicle?: Claimant;
	trips?: ConsolidatedMovementBase[];
	thirdParty?: ThirdParty[];
}
