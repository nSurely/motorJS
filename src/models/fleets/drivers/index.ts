import { Fleet } from "..";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { Driver } from "../../drivers";
import { FleetsBase } from "../interface";
import { FleetDriverBase } from "./interface";

export class FleetDriver extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	fleetId?: string;

	isVehicleManager?: boolean;
	isDriverManager?: boolean;
	isBillingManager?: boolean;
	isActive?: boolean;
	expiresAt?: Date;
	createdAt?: Date;
	sourceId?: string;
	driver?: Driver;

	constructor(assignment: FleetDriverBase) {
		super();
		Object.assign(this, assignment);
	}

	id() {
		return this.driver?.id;
	}

	fullName() {
		return this.driver?.fullName();
	}

	telemaicsId() {
		return this.sourceId;
	}

	async getFleet(): Promise<Fleet | null> {
		if (!this.fleetId) {
			return null;
		}
		let raw = await this.api.request({
			method: "GET",
			endpoint: `fleets/${this.fleetId}`,
		});

		let instance = new Fleet(raw);

		if (this.api) {
			instance.api = this.api;
		}
		return instance;
	}
}
