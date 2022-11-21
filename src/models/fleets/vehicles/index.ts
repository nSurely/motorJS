import { Fleet } from "..";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { Driver } from "../../drivers";
import { Vehicle } from "../../vehicles/rv";
import { FleetsBase } from "../interface";
import { FleetVehicleBase } from "./interface";

export class FleetVehicle extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	isActive?: boolean;
	isOpenToAll?: boolean;
	sourceId?: string;
	createdAt?: Date;
	registeredVehicle?: Vehicle;

	constructor(assignment: FleetVehicleBase) {
		super();
		Object.assign(this, assignment);
	}

	id() {
		return this.registeredVehicle?.id;
	}
}
