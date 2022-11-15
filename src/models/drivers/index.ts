import { DriverBase, Occupation } from "./interface";
import { FleetsBase } from "../fleets/interface";
import { RiskBase } from "../risk/interface";
import { PolicyBase } from "../policy/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { PrivateApiHandler } from "../custom";
import { Vehicle } from "../vehicles/rv";
import { BillingAccount } from "../billing/accounts";
import { DriverVehicle } from "../vehicles/drv";

export class Driver extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	adrLine1?: string;
	adrLine2?: string;
	adrLine3?: string;
	county?: string;
	province?: string;
	postcode?: string;
	externalId?: string;
	lang?: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	approvedAt?: Date;
	driverActivated?: boolean;
	activatedAt?: Date;
	dob?: Date;
	isApproved?: boolean;
	isActive?: boolean;
	gender?: string;
	telE164?: string;
	drivingStartDate?: Date;
	countryIsoCode?: string;
	occupation?: Occupation;
	id?: string;
	sourceId?: string;
	email?: string;
	createdAt?: Date;
	countryName?: string;
	driversLicenseLoc?: string;
	proofOfAddressLoc?: string;
	idLoc?: string;
	profilePicLoc?: string;
	fleets?: FleetsBase[];
	vehicleCount?: number;
	totalPoints?: number;
	distanceKm30Days?: number;
	risk?: RiskBase;
	policies?: PolicyBase[];

	constructor(driver: DriverBase) {
		super();
		Object.assign(this, driver);
	}

	private _checkId() {
		if (!this.id) {
			throw new Error("ID must be set");
		}
	}

	fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	// Refresh all the properties of this class
	async refresh() {
		let raw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.id}`,
			params: {
				risk: true,
				address: true,
				fleets: true,
				vehicleCount: true,
				distance: true,
				points: true,
				files: true,
				contact: true,
				occupation: true,
			},
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
			endpoint: `drivers/${this.id}`,
			fields: fields,
			exclude: ["fleets", "createdAt"],
		});
	}

	async update({ persist = false, fields = {} }: { persist?: boolean; fields?: Object }) {
		await this._update({
			endpoint: `drivers/${this.id}`,
			persist: persist,
			fields: fields,
			exclude: ["fleets", "createdAt"],
		});
	}

	async listVehicles(): Promise<Vehicle[]> {
		let vehiclesRaw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.id}/vehicles`,
		});
		return vehiclesRaw.map((vehicle: any) => {
			let instance = new DriverVehicle(vehicle);
			instance.api = this.api;
			return instance;
		});
	}

	getDisplay() {
		return this.fullName();
	}

	telematicsId() {
		return this.sourceId;
	}

	async listBillingAccounts(primaryOnly: boolean = false): Promise<BillingAccount[]> {
		this._checkId();

		let billingAccountsRaw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.id}/billing-accounts`,
		});

		return billingAccountsRaw.map((billingAccount: any) => {
			let instance = new BillingAccount(billingAccount);
			instance.api = this.api;
			return instance;
		});
	}
}
