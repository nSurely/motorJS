import { RegisteredVehicleBase } from "../../vehicles/rv/interface";

export interface FleetVehicleTypeBase {
	isActive?: boolean;
	isOpenToAll?: boolean;
	sourceId?: string;
	createdAt?: Date;
	registeredVehicle?: RegisteredVehicleBase;
}
