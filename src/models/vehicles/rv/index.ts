import { RiskBase } from "../../risk/interface";
import { RegisteredVehicleBase } from "./interface";
import { DriverRegisteredVehicleBase } from "../drv/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";
import { VehicleTypeBase } from "../v/interface";
import { PolicyBase } from "../../policy/interface";
import { VehicleType } from "../v";
import { DriverVehicle } from "../drv";

export class Vehicle extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	apiPath?: string;
	externalId?: string;
	regPlate?: string;
	vin?: string;
	year?: number;
	preowned?: boolean;
	isApproved?: boolean;
	approvedAt?: Date;
	onRoadParking?: boolean;
	mileageKm?: number;
	engineLitres?: number;
	fuelType?: string;
	hasTurbo?: boolean;
	hasSupercharger?: boolean;
	bodyModified?: boolean;
	engineModified?: boolean;
	gearboxType?: string;
	isActive?: boolean;
	risk?: RiskBase;
	backgroundCheckStatus?: string;
	backgroundCheckProvider?: string;
	backgroundCheckRawOutput?: string;
	backgroundCheckPassed?: boolean;
	id?: string;
	sourceId?: string;
	createdAt?: Date;
	frontPicLoc?: string;
	sidePicLoc1?: string;
	sidePicLoc2?: string;
	rearPicLoc?: string;
	topPicLoc?: string;
	proofOfRegLoc?: string;
	distance3m?: number;
	totalDrvCount?: number;
	policies?: PolicyBase[];
	vehicle?: VehicleType;
	driverVehicles?: DriverRegisteredVehicleBase[];

	constructor(vehicle: RegisteredVehicleBase) {
		super();
		vehicle.vehicle = vehicle.vehicle ? new VehicleType(vehicle.vehicle) : undefined;
		Object.assign(this, vehicle);
	}

	private _checkId() {
		if (!this.id) {
			throw new Error("ID must be set");
		}
	}

	getDisplay() {
		if (this.vehicle) {
			return `${this.vehicle?.getDisplay()} - ${this.regPlate}`;
		} else {
			return this.regPlate || "Unknown";
		}
	}

	async addDrv({ driverId, drv }: { driverId: string; drv: DriverVehicle }) {
		this._checkId();

		if (!drv?.api) {
			drv.api = this.api;
		}
		
		return await drv.create({ driverId: driverId, registeredVehicleId: this.id });
	}

	async addDriver({ driverId, displayName, isOwner, isPrimaryDriver }: { driverId: string; displayName?: string; isOwner?: boolean; isPrimaryDriver?: boolean }) {
		let drv = new DriverVehicle({
			displayName: displayName,
			isOwner: isOwner,
			isPrimaryDriver: isPrimaryDriver,
		});

		drv.api = this.api;

		return await this.addDrv({ driverId: driverId, drv: drv });
	}

	async refresh() {
		this._checkId();

		let raw = await this.api.request({
			method: "GET",
			endpoint: `registered-vehicles/${this.id}`,
		});

		raw.api = this.api;

		Object.assign(this, raw);
	}

	async delete() {
		this._checkId();

		await this.api.request({
			method: "DELETE",
			endpoint: `registered-vehicles/${this.id}`,
		});
	}

	async save(fields: Object = {}) {
		this._checkId();

		await this._save({
			endpoint: `registered-vehicles/${this.id}`,
			fields: fields,
			exclude: ["vehicleType"],
		});
	}

	async update({ persist = false, fields = {} }: { persist?: boolean; fields?: Object }) {
		await this._update({
			endpoint: `vehicles/${this.id}`,
			persist: persist,
			fields: fields,
			exclude: ["vehicleType"],
		});
	}
}
