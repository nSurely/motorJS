import { Driver } from "../../drivers";
import { DriverBase } from "../../drivers/interface";
import { Vehicle } from "../../vehicles/rv";
import { RegisteredVehicleBase } from "../../vehicles/rv/interface";

export interface FleetDriverVehicleAssignementBase {
	isActive?: boolean;
	expiresAt?: Date;
	createdAt?: Date;
	sourceId?: string;
	assigned?: boolean;
	driver?: Driver;
	registeredVehicle?: Vehicle;
}
