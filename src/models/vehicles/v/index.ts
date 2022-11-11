import { RiskBase } from "../../risk/interface";
import { VehicleTypeBase } from "./interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { PrivateApiHandler } from "../../custom";

export class VehicleType extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	apiPath?: string;
	externalId?: string;
	display?: string;
	description?: string;
	isActive?: boolean;
	vehicleType?: string;
	variant?: string;
	code?: string;
	baseMsrpNew?: number;
	baseMsrpCurrent?: number;
	brand?: string;
	model?: string;
	yearFloor?: number;
	yearTop?: number;
	doors?: number;
	wheels?: number;
	autonomy?: number;
	seats?: number;
	cylinders?: number;
	valves?: number;
	valveTiming?: string;
	camType?: string;
	driveType?: string;
	transmission?: string;
	gearCount?: number;
	engineSizeML?: number;
	horsePower?: number;
	torqueNM?: number;
	engineType?: string;
	fuelType?: string;
	fuelTankCapacityML?: number;
	combinedKMPL?: number;
	cityKMPL?: number;
	combinedKMPLE?: number;
	cityKMPLE?: number;
	kwh100KM?: number;
	timeToCharge240vMins?: number;
	electricRangeKM?: number;
	warrantyBasicYears?: number;
	warrantyBasicKM?: number;
	warrantyBasicExpiry?: Date;
	warrantyDrivetrainYears?: number;
	warrantyDrivetrainKM?: number;
	warrantyDrivetrainExpiry?: Date;
	warrantyRoadsideYears?: number;
	warrantyRoadsideKM?: number;
	warrantyRoadsideExpiry?: Date;
	warrantyRustYears?: number;
	warrantyRustKM?: number;
	warrantyRustExpiry?: Date;
	warrantyFreeMaintenanceYears?: number;
	warrantyFreeMaintenanceKM?: number;
	warrantyFreeMaintenanceExpiry?: Date;
	warrantyHybridComponentYears?: number;
	warrantyHybridComponentKM?: number;
	warrantyHybridComponentExpiry?: Date;
	warrantyEVBatteryYears?: number;
	warrantyEVBatteryKM?: number;
	warrantyEVBatteryExpiry?: Date;
	lengthMM?: number;
	widthMM?: number;
	heightMM?: number;
	wheelBaseMM?: number;
	frontTrackMM?: number;
	rearTrackMM?: number;
	groundClearanceMM?: number;
	angleOfApproachDegrees?: number;
	angleOfDepartureDegrees?: number;
	turningCircleM?: number;
	dragCoefficient?: number;
	epaInteriorVolumeM3?: number;
	cargoCapacityM3?: number;
	maxCargoCapacityM3?: number;
	curbWeightKG?: number;
	grossWeightKG?: number;
	maxPayloadKG?: number;
	maxTowingCapacityKG?: number;
	id?: string;
	createdAt?: Date;
	sourceId?: string;
	imageLoc?: string;
	thumbnailLoc?: string;
	translations?: Object;
	risk?: RiskBase;

	constructor(vehicleType: VehicleTypeBase) {
		super();
		Object.assign(this, vehicleType);
	}

	private _checkId() {
		if (!this.id) {
			throw new Error("ID must be set");
		}
	}

	getDisplay() {
		return `${this.brand} (${this.model})`;
	}

	async refresh() {
		this._checkId();

		let raw = await this.api.request({
			method: "GET",
			endpoint: `vehicles/${this.id}`,
		});

		raw.api = this.api;

		Object.assign(this, raw);
	}

	async delete() {
		this._checkId();

		await this.api.request({
			method: "DELETE",
			endpoint: `vehicles/${this.id}`,
		});
	}

	async save(fields: Object = {}) {
		this._checkId();

		await this._save({
			endpoint: `vehicles/${this.id}`,
			fields: fields,
		});
	}

	async update({ persist = false, fields = {} }: { persist?: boolean; fields?: Object }) {
		await this._update({
			endpoint: `vehicles/${this.id}`,
			persist: persist,
			fields: fields,
		});
	}
}
