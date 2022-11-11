import { FleetsBase } from "../fleets/interface";
import { RiskBase } from "../risk/interface";
import { PolicyBase } from "../policy/interface";

export interface DriverBase {
    apiPath?: string;
	adrLine1?: string;
	adrLine2?: string;
	adrLine3?: string;
	county?: string;
	province?: string;
	postcode?: string;
	externalId?: string;
	lang?: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	approvedAt?: Date;
	driverActivated?: boolean;
	activatedAt?: Date;
	dob?: Date;
	isApproved?: boolean;
	isActive?: boolean;
	gender?: string;
	telE164?: string;
	drivingStartDate?: Date;
	countryIsoCode?: string;
	occupation?: Occupation;
	id?: string;
	sourceId?: string;
	email?: string;
	createdAt?: Date;
	countryName?: string;
	driversLicenseLoc?: string;
	proofOfAddressLoc?: string;
	idLoc?: string;
	profilePicLoc?: string;
	fleets?: FleetsBase[];
	vehicleCount?: number;
	totalPoints?: number;
	distanceKm30Days?: number;
	risk?: RiskBase;
	policies?: PolicyBase[];
}

export interface Occupation {
	position?: string;
	employerName?: string;
	adrLine1?: string;
	adrLine2?: string;
	adrLine3?: string;
	county?: string;
	province?: string;
	postcode?: string;
	lat?: number;
	lng?: number;
	officeDaysWeek?: string;
	officeHours?: string;
}
