import { RiskBase } from "../risk/interface";

export interface FleetsBase {
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
	translations?: Translations;
	risk?: RiskBase;
	vehicleCount?: number;
	driverCount?: number;
}

export interface Translations {
	display?: Object;
	description?: Object;
}
