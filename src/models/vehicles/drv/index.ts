import { DriverRegisteredVehicleBase, DriverRegisteredVehicleWithDriverId } from "./interface";
import { RiskBase } from "../../risk/interface";
import { PolicyBase } from "../../policy/interface";
import { DriverBase } from "../../drivers/interface";
import { RegisteredVehicleBase } from "../rv/interface";
import { Vehicle } from "../rv";
import { PrivateApiHandler } from "../../custom";

export class DriverVehicle extends PrivateApiHandler {
    driverId?: string;
	apiPath?: string;
	externalId?: string;
	displayName?: string;
	isApproved?: boolean;
	approvedAt?: Date;
	isOwner?: boolean;
	isDefault?: boolean;
	isActive?: boolean;
	isPrimaryDriver?: boolean;
	expiresAt?: Date;
	risk?: RiskBase;
	id?: string;
	sourceId?: string;
	createdAt?: Date;
	proofOfOwnershipLoc?: string;
	distance3m?: number;
	policies?: PolicyBase[];
	driver?: DriverBase;
	registeredVehicle?: Vehicle;

	constructor(vehicle: DriverRegisteredVehicleWithDriverId) {
		super();
		vehicle.registeredVehicle = vehicle.registeredVehicle ? new Vehicle(vehicle.registeredVehicle) : undefined;
		Object.assign(this, vehicle);
	}

	private _checkId() {
		if (!this.id) {
			throw new Error("ID must be set");
		}
	}

	getDisplay() {
		if (this.registeredVehicle) {
			return `${this.displayName} ${this.registeredVehicle?.getDisplay()}`;
		} else {
			return this.displayName || "Unknown";
		}
	}

	telematicsId() {
		return this.sourceId;
	}

	async refresh() {
		this._checkId();

		let raw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
		});

		raw.api = this.api;

		Object.assign(this, raw);
	}

	async delete() {
		this._checkId();

		await this.api.request({
			method: "DELETE",
			endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
		});
	}

	async save(fields: Object = {}) {
		this._checkId();

		await this._save({
			endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
			fields: fields,
			exclude: ["driverId", "vehicle"],
		});
	}

	async update({ persist = false, fields = {} }: { persist?: boolean; fields?: Object }) {
		await this._update({
			endpoint: `drivers/${this.driverId}/vehicles/${this.id}`,
			persist: persist,
			fields: fields,
			exclude: ["driverId", "vehicle"],
		});
	}
}
