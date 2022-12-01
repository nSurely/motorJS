import { DriverBase, Occupation } from "./interface";
import { FleetsBase } from "../fleets/interface";
import { RiskBase } from "../risk/interface";
import { PolicyBase } from "../policy/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { PrivateApiHandler } from "../custom";
import { Vehicle } from "../vehicles/rv";
import { BillingAccount } from "../billing/accounts";
import { DriverVehicle } from "../vehicles/drv";
import { Policy } from "../policy";
import { BillingEvent } from "../billing/events";

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
			endpoint: `drivers/${this.id}`,
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
		let raw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.id}/vehicles`,
		});
		return raw.map((vehicle: any) => {
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

		let raw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.id}/billing-accounts`,
		});

		return raw.map((billingAccount: any) => {
			let instance = new BillingAccount(billingAccount);
			instance.api = this.api;
			return instance;
		});
	}

	async getBillingAccount({ id }: { id: string }) {
		this._checkId();

		if (!id) {
			throw new Error("Billing account id is required");
		}

		let raw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${this.id}/billing-accounts/${id}`,
		});

		let instance = new BillingAccount(raw);
		instance.api = this.api;
		return instance;
	}

	async listVehiclePolicies({ vehicleId }: { vehicleId?: string }): Promise<Policy[]> {
		let raw = await this.api.request({
			method: "GET",
			endpoint: `policy`,
			params: {
				drvIds: vehicleId,
			},
		});

		return raw.map((policy: any) => {
			let instance = new Policy(policy);
			instance.api = this.api;
			return instance;
		});
	}

	async getPrimaryBillingAccount() {
		let res = await this.listBillingAccounts(true);

		if (res.length > 0 && res[0].id) {
			return await this.getBillingAccount({ id: res[0].id });
		}
	}

	async createBillingAccount({ account }: { account: BillingAccount }) {
		this._checkId();
		let raw = await this.api.request({
			method: "POST",
			endpoint: `drivers/${this.id}/billing-accounts`,
			params: account,
		});

		let instance = new BillingAccount(raw);
		instance.api = this.api;
		return instance;
	}

	async charge({ amount, event }: { amount?: number; event?: BillingEvent }) {
		if (!amount && !event) {
			throw new Error("Either amount or event is required");
		}

		if (!event) {
			event = new BillingEvent({
				amount: amount,
				message: "Charge",
				type: "other",
			});
		}

		this._checkId();

		let raw = await this.api.request({
			method: "POST",
			endpoint: `drivers/${this.id}/billing-events`,
			params: event,
		});

		let instance = new BillingEvent(raw);
		instance.api = this.api;
		return instance;
	}

	async *listCharges({ eventType, eventStatus, maxRecords }: { eventType?: string; eventStatus?: string; maxRecords?: number }) {
		this._checkId();
		let params: any = {};
		if (eventType) {
			params.type = eventType;
		}
		if (eventStatus) {
			params.status = eventStatus;
		}

		let count = 0;
		for await (let raw of this.api.batchFetch({
			endpoint: `drivers/${this.id}/billing-events`,
			params: params,
		})) {
			if (maxRecords && count >= maxRecords) {
				break;
			}
			let instance = new BillingEvent(raw);
			instance.api = this.api;
			yield instance;
			count += 1;
		}
	}

	async *listPolicies({ looseMatch = true, isActivePolicy }: { looseMatch?: boolean; isActivePolicy?: boolean }): AsyncGenerator<Policy> {
		let params: any = {};

		params.driverIds = this.id;
		params.driverLooseMatch = looseMatch;

		if (isActivePolicy) {
			params.isActivePolicy = isActivePolicy;
		}

		for await (let raw of this.api.batchFetch({
			endpoint: `policy`,
			params: params,
		})) {
			let instance = new Policy(raw);
			instance.api = this.api;
			yield instance;
		}
	}

	async createPolicy({ policy }: { policy?: Policy }) {
		if (!policy) {
			policy = new Policy({
				policyGroup: "d",
			});
		}
		policy.api = this.api;
		return await policy.create({
			api: this.api as APIHandlerAuth,
			recordId: this.id!,
		});
	}
}
