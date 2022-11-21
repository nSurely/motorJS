import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { PrivateApiHandler } from "../custom";
import { Policy } from "../policy";
import { RiskBase } from "../risk/interface";
import { LANG } from "../types";
import { FleetDriverVehicleAssignment } from "./assigned";
import { FleetDriver } from "./drivers";
import { FleetsBase } from "./interface";
import { FleetVehicle } from "./vehicles";

export class Fleet extends PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	apiPath?: string;
	externalId?: string;
	display?: string;
	description?: string;
	tags?: string;
	isActive?: boolean;
	requiresDriverAssignment?: boolean;
	basePremiumBillingProc?: string;
	ratesBillingProc?: string;
	parentId?: string;
	id?: string;
	createdAt?: Date;
	translations?: Object;
	risk?: RiskBase;
	vehicleCount?: number;
	driverCount?: number;

	constructor(fleet: FleetsBase) {
		super();
		Object.assign(this, fleet);
	}

	private getTranslations({ key, lang }: { key: string; lang: string }) {
		if (!lang) {
			return this[key as keyof FleetsBase];
		}

		if (!LANG.includes(lang)) {
			throw new Error(`${lang} is not a valid language code`);
		}

		const val = (this.translations as any)?.[key]?.[lang];

		if (val) {
			return val;
		}

		return this[key as keyof FleetsBase];
	}

	getDisplay({ lang }: { lang: string }) {
		return this.getTranslations({ key: "display", lang });
	}

	getDescription({ lang }: { lang: string }) {
		return this.getTranslations({ key: "description", lang });
	}

	hasParent() {
		return !!this.parentId;
	}

	getTags() {
		return this.tags?.split(",") || [];
	}

	private checkId() {
		if (!this.id) {
			throw new Error("Fleet ID is required");
		}
	}

	async refresh() {
		this.checkId();
		const fleet = await this.api.request({
			method: "GET",
			endpoint: `/fleets/${this.id}`,
		});
		Object.assign(this, fleet);
	}

	async delete() {
		this.checkId();
		await this.api.request({
			method: "DELETE",
			endpoint: `/fleets/${this.id}`,
		});
	}

	async save(fields: Object = {}) {
		this.checkId();
		return await this._save({
			endpoint: `/fleets/${this.id}`,
			fields,
			exclude: ["vehicleType"],
		});
	}

	async update({ persist, fields }: { persist?: boolean; fields?: Object }) {
		if (persist) {
			return await this.save(fields);
		}

		return await this._update({ fields });
	}

	async getParent() {
		if (!this.hasParent()) {
			return null;
		}

		let raw = await this.api.request({
			method: "GET",
			endpoint: `/fleets/${this.parentId}`,
		});

		let instance = new Fleet(raw);
		instance.api = this.api;
		return instance;
	}

	/**
	 * Driver operations
	 */

	async addDriver({
		driverId,
		isVehicleManager = false,
		isDriverManager = false,
		isBillingManager = false,
		expiresAt,
		isActive = true,
		vehicleIds,
		vehicleExpiresAt,
	}: {
		driverId: string;
		isVehicleManager?: boolean;
		isDriverManager?: boolean;
		isBillingManager?: boolean;
		expiresAt?: Date;
		isActive?: boolean;
		vehicleIds?: string[];
		vehicleExpiresAt?: Date[] | Date;
	}) {
		if (!vehicleIds) {
			vehicleIds = [];
		}

		let data: any = {
			driverId,
			isVehicleManager,
			isDriverManager,
			isBillingManager,
			isActive,
		};
		if (expiresAt?.toISOString()) {
			data.expiresAt = expiresAt.toISOString();
		}

		let raw = await this.api.request({
			method: "POST",
			endpoint: `/fleets/${this.id}/drivers`,
			data,
		});

		let fleetDriver = new FleetDriver(raw);
		fleetDriver.api = this.api;

		if (!vehicleIds.length) {
			return fleetDriver;
		}

		try {
			//loop throught vehicleIds
			if (vehicleExpiresAt instanceof Date || !vehicleExpiresAt) {
				for (let vehicleId of vehicleIds) {
					let data: any = {};
					if (vehicleExpiresAt?.toISOString()) {
						data.expiresAt = vehicleExpiresAt.toISOString();
					}
					await this.api.request({
						method: "POST",
						endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
						data: data,
					});
				}
				return fleetDriver;
			}

			vehicleIds.forEach(async (vehicleId, index) => {
				let data: any = {};
				if (vehicleExpiresAt[index]?.toISOString()) {
					data.expiresAt = vehicleExpiresAt[index].toISOString();
				}

				await this.api.request({
					method: "POST",
					endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
					data: data,
				});
			});
		} catch (e) {
			//if error, remove driver
			await this.api.request({
				method: "DELETE",
				endpoint: `/fleets/${this.id}/drivers/${driverId}`,
			});
			throw e;
		}
		return fleetDriver;
	}

	async removeDriver({ driverId }: { driverId: string }) {
		await this.api.request({
			method: "DELETE",
			endpoint: `/fleets/${this.id}/drivers/${driverId}`,
		});
	}

	async getDriver() {
		let raw = await this.api.request({
			method: "GET",
			endpoint: `/fleets/${this.id}/drivers`,
		});

		let fleetDriver = new FleetDriver(raw);
		fleetDriver.api = this.api;
		return fleetDriver;
	}

	async updateDriver({
		driverId,
		isVehicleManager,
		isDriverManager,
		isBillingManager,
		expiresAt,
		isActive,
	}: {
		driverId: string;
		isVehicleManager?: boolean;
		isDriverManager?: boolean;
		isBillingManager?: boolean;
		expiresAt?: Date;
		isActive?: boolean;
	}) {
		let data: any = {};
		if (isVehicleManager !== undefined) {
			data.isVehicleManager = isVehicleManager;
		}
		if (isDriverManager !== undefined) {
			data.isDriverManager = isDriverManager;
		}
		if (isBillingManager !== undefined) {
			data.isBillingManager = isBillingManager;
		}
		if (expiresAt?.toISOString()) {
			data.expiresAt = expiresAt.toISOString();
		}
		if (isActive !== undefined) {
			data.isActive = isActive;
		}

		let raw = await this.api.request({
			method: "PATCH",
			endpoint: `/fleets/${this.id}/drivers/${driverId}`,
			data,
		});

		let fleetDriver = new FleetDriver(raw);
		fleetDriver.api = this.api;
		return fleetDriver;
	}

	async *listDrivers(): AsyncIterableIterator<FleetDriver> {
		for await (let raw of this.api.batchFetch({
			endpoint: `/fleets/${this.id}/drivers`,
		})) {
			let fleetDriver = new FleetDriver(raw);
			fleetDriver.api = this.api;
			yield fleetDriver;
		}
	}

	/**
	 * Vehicle operations
	 */

	async addVehicle({ vehicleId, isActive = true, isOpenToAll = false }: { vehicleId: string; isActive?: boolean; isOpenToAll?: boolean }) {
		let data: any = {
			vehicleId,
			isActive,
			isOpenToAll,
		};

		let raw = await this.api.request({
			method: "POST",
			endpoint: `/fleets/${this.id}/vehicles`,
			data,
		});

		let fleetVehicle = new FleetVehicle(raw);
		fleetVehicle.api = this.api;
		return fleetVehicle;
	}

	async removeVehicle({ vehicleId }: { vehicleId: string }) {
		await this.api.request({
			method: "DELETE",
			endpoint: `/fleets/${this.id}/vehicles/${vehicleId}`,
		});
	}

	async updateVehicle({ vehicleId, isActive, isOpenToAll }: { vehicleId: string; isActive?: boolean; isOpenToAll?: boolean }) {
		let data: any = {};
		if (isActive !== undefined) {
			data.isActive = isActive;
		}
		if (isOpenToAll !== undefined) {
			data.isOpenToAll = isOpenToAll;
		}

		let raw = await this.api.request({
			method: "PATCH",
			endpoint: `/fleets/${this.id}/vehicles/${vehicleId}`,
			data,
		});

		let fleetVehicle = new FleetVehicle(raw);
		fleetVehicle.api = this.api;
		return fleetVehicle;
	}

	async *listVehicles(): AsyncIterableIterator<FleetVehicle> {
		for await (let raw of this.api.batchFetch({
			endpoint: `/fleets/${this.id}/vehicles`,
		})) {
			let fleetVehicle = new FleetVehicle(raw);
			fleetVehicle.api = this.api;
			yield fleetVehicle;
		}
	}

	/**
	 * driver to vehicle assignment operations
	 */
	async addDriverToVehicle({ driverId, vehicleId, expiresAt, isActive = true }: { driverId: string; vehicleId: string; expiresAt?: Date; isActive?: boolean }) {
		let data: any = {
			driverId,
			vehicleId,
			isActive,
		};

		if (expiresAt?.toISOString()) {
			data.expiresAt = expiresAt.toISOString();
		}

		let raw = await this.api.request({
			method: "POST",
			endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles`,
			data,
		});

		let instance = new FleetDriverVehicleAssignment(raw);
		instance.api = this.api;
		return instance;
	}

	async removeDriverFromVehicle({ driverId, vehicleId }: { driverId: string; vehicleId: string }) {
		await this.api.request({
			method: "DELETE",
			endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
		});
	}

	async updateDriverVehicleAssignment({ driverId, vehicleId, expiresAt, isActive }: { driverId: string; vehicleId: string; expiresAt?: Date; isActive?: boolean }) {
		let data: any = {};
		if (expiresAt?.toISOString()) {
			data.expiresAt = expiresAt.toISOString();
		}
		if (isActive !== undefined) {
			data.isActive = isActive;
		}

		await this.api.request({
			method: "PATCH",
			endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles/${vehicleId}`,
			data,
		});
	}

	async *listDriverVehicleAssignments({
		driverId,
		includeUnassigned = true,
	}: {
		driverId: string;
		includeUnassigned?: boolean;
	}): AsyncIterableIterator<FleetDriverVehicleAssignment> {
		for await (let raw of this.api.batchFetch({
			endpoint: `/fleets/${this.id}/drivers/${driverId}/vehicles`,
			params: {
				includeUnassigned,
			},
		})) {
			let instance = new FleetDriverVehicleAssignment(raw);
			instance.api = this.api;
			yield instance;
		}
	}

	/**
	 * policy operations
	 */

	async *listPolicies(): AsyncIterableIterator<Policy> {
		for await (let raw of this.api.batchFetch({
			endpoint: `/policy`,
			params: {
				fleetId: this.id,
			},
		})) {
			let instance = new Policy(raw);
			instance.api = this.api;
			yield instance;
		}
	}
}
