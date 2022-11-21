import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { Driver } from "../../drivers";
import { DriverBase } from "../../drivers/interface";
import { Vehicle } from "../../vehicles/rv";
import { RegisteredVehicleBase } from "../../vehicles/rv/interface";
import { FleetDriverVehicleAssignementBase } from "./interface";

export class FleetDriverVehicleAssignment extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	isActive?: boolean;
	expiresAt?: Date;
	createdAt?: Date;
	sourceId?: string;
	assigned?: boolean;
	driver?: Driver;
	registeredVehicle?: Vehicle;
	constructor(assignment: FleetDriverVehicleAssignementBase) {
		super();
		Object.assign(this, assignment);
	}

	id() {
		return [this.driver?.id, this.registeredVehicle?.id];
	}

	telemaicsId() {
		return this.sourceId;
	}
}
