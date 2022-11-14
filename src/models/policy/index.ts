import { Approval } from "./approval/interface";
import { Cancellation } from "./cancellation/interface";
import { Config } from "./config/interface";
import { Fees } from "./fees/interface";
import { Driver } from "./driver/interface";
import { Duration } from "./duration/interface";
import { Excess } from "./excess/interface";
import { Extras } from "./extras/interface";
import { Premium } from "./premium/interface";
import { Contribution } from "./contribution/interface";
import { Final } from "./final/interface";
import { Issuer } from "./issuer/interface";
import { NoClaims } from "./noclaims/interface";
import { Rates } from "./rates/interface";
import { Rewards } from "./rewards/interface";
import { Telematics } from "./telematics/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { PolicyBase } from "./interface";
import { PolicyApproval } from "./approval";
import { PolicyCancellation } from "./cancellation";
import { PolicyDriver } from "./driver";
import { PolicyDuration } from "./duration";
import { PrivateApiHandler } from "../custom";
import { policyGroup } from "./enums/group";

export class Policy extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	apiPath?: string;
	isActivePolicy?: boolean;
	sumInsured?: number;
	canRenew?: boolean;
	cover?: string[];
	maxPassengers?: number;
	id?: string;
	createdAt?: Date;
	policyCertificateLoc?: string;
	approval?: PolicyApproval;
	cancellation?: PolicyCancellation;
	config?: Config;
	contribution?: Contribution;
	driver?: PolicyDriver;
	duration?: PolicyDuration;
	excess?: Excess;
	extras?: Extras;
	fees?: Fees;
	final?: Final;
	issuer?: Issuer;
	noClaims?: NoClaims;
	premium?: Premium;
	rates?: Rates;
	rewards?: Rewards;
	telematics?: Telematics;
	policyGroup?: string;

	constructor(policy: PolicyBase) {
		super();
		policy.approval = policy.approval ? new PolicyApproval(policy.approval) : undefined;
		policy.cancellation = policy.cancellation ? new PolicyCancellation(policy.cancellation) : undefined;
		policy.driver = policy.driver ? new PolicyDriver(policy.driver) : undefined;
		policy.duration = policy.duration ? new PolicyDuration(policy.duration) : undefined;
		Object.assign(this, policy);
	}

	isCancelled() {
		return this.cancellation?.isCancelled();
	}

	isApproved() {
		return this.approval?.isApproved();
	}

	isExpired() {
		return this.duration?.isExpired();
	}

	isDriverAgreed() {
		return this.driver?.isAgreed();
	}

	isLive() {
		return this.isActivePolicy && this.isApproved() && !this.isCancelled() && !this.isExpired() && this.isDriverAgreed();
	}

	ratePerKm(): number | undefined {
		if (!this.rates?.enabled) {
			return undefined;
		}
		return this.final?.rates?.value;
	}

	premiumAmount(): number | undefined {
		return this.final?.premium?.value;
	}

	private _checkId() {
		if (!this.id) {
			throw new Error("ID must be set");
		}
	}

	async refesh() {
		this._checkId();
		const policy = await this.api.request({
			method: "GET",
			endpoint: `policy/${this.id}`,
		});
		policy.approval = policy.approval ? new PolicyApproval(policy.approval) : undefined;
		policy.cancellation = policy.cancellation ? new PolicyCancellation(policy.cancellation) : undefined;
		policy.driver = policy.driver ? new PolicyDriver(policy.driver) : undefined;
		policy.duration = policy.duration ? new PolicyDuration(policy.duration) : undefined;
		Object.assign(this, policy);
	}

	async delete() {
		this._checkId();
		await this.api.request({
			method: "DELETE",
			endpoint: `policy/${this.id}`,
		});
	}

	async save(fields: Object) {
		this._checkId();
		return await this._save({
			endpoint: `policy/${this.id}`,
			fields,
		});
	}

	async update(persist: boolean = false, fields: Object) {
		this._update({
			endpoint: `policy/${this.id}`,
			fields,
			persist,
		});
	}

	async create({ api, recordId, driverId, vehicleId }: { api: APIHandlerAuth; recordId: string; driverId?: string; vehicleId?: string }): Promise<Policy> {
		let params = {};

		if (this.policyGroup === policyGroup.D) {
			if (driverId && recordId !== driverId) {
				recordId = driverId;
			}
		} else if (this.policyGroup === policyGroup.DRV) {
			//
		} else if (this.policyGroup === policyGroup.RV) {
			//
		} else if (this.policyGroup === policyGroup.FD) {
			if (!driverId) {
				throw new Error("Driver ID must be supplied for FD policy");
			}

			if (recordId == driverId) {
				throw new Error("RecordId (fleet id) must not be the same as driverId for FD policy");
			}

			params = {
				driverId,
			};
		} else if (this.policyGroup === policyGroup.FDRV) {
			if (!driverId) {
				throw new Error("Driver ID must be supplied for FDRV policy");
			}
			if (!vehicleId) {
				throw new Error("Vehicle ID must be supplied for FDRV policy");
			}
			params = {
				driverId,
				vehicleId,
			};

			if (recordId == driverId || recordId == vehicleId) {
				throw new Error("RecordId (fleet id) must not be the same as driverId or vehicleId for FDRV policy");
			}
		} else if (this.policyGroup === policyGroup.FRV) {
			if (!vehicleId) {
				throw new Error("Vehicle ID must be supplied for FRV policy");
			}

			if (recordId == vehicleId) {
				throw new Error("RecordId (fleet id) must not be the same as vehicleId for FRV policy");
			}

			params = {
				vehicleId,
			};
		}

		const raw = await api.request({
			method: "POST",
			endpoint: `policy/${recordId}`,
			params,
			data: this,
		});

		raw.approval = raw.approval ? new PolicyApproval(raw.approval) : undefined;
		raw.cancellation = raw.cancellation ? new PolicyCancellation(raw.cancellation) : undefined;
		raw.driver = raw.driver ? new PolicyDriver(raw.driver) : undefined;
		raw.duration = raw.duration ? new PolicyDuration(raw.duration) : undefined;
		raw.api = api;

		Object.assign(this, raw);
		return this;
	}
}
