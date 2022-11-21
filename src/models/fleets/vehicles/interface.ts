import { RegisteredVehicleBase } from "../../vehicles/rv/interface";

export interface FleetVehicleBase {
	isActive?: boolean;
	isOpenToAll?: boolean;
	sourceId?: string;
	createdAt?: Date;
	registeredVehicle?: RegisteredVehicleBase;
}
