import { Driver } from "../../drivers";
import { DriverBase } from "../../drivers/interface";

export interface FleetDriverBase {

	fleetId?: string;
	isVehicleManager?: boolean;
	isDriverManager?: boolean;
	isBillingManager?: boolean;
	isActive?: boolean;
	expiresAt?: Date;
	createdAt?: Date;
	sourceId?: string;
	driver?: Driver;
}
