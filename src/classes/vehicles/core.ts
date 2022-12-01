import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { DriverVehicle } from "../../models/vehicles/drv";
import { Vehicle } from "../../models/vehicles/rv";
import { Driver } from "../../models/drivers";
import { DriverBase } from "../../models/drivers/interface";
import { DriverRegisteredVehicleBase } from "../../models/vehicles/drv/interface";
import { Search } from "../../utils/search";
import { VehicleType } from "../../models/vehicles/v";

export class Vehicles {
	storageManager!: StorageManager;
	api!: APIHandlerAuth | APIHandlerNoAuth;

	async getVehicle({
		vehicleId,
		includeTranslations = true,
		includeDistance = true,
		includeDrvCount = true,
	}: {
		vehicleId: string;
		includeTranslations?: boolean;
		includeDistance?: boolean;
		includeDrvCount?: boolean;
	}) {
		let params = {
			drv: true,
			trns: includeTranslations,
			distance3m: includeDistance,
			totalDrvCount: includeDrvCount,
		};

		let raw = await this.api.request({
			method: "GET",
			endpoint: `registered-vehicles/${vehicleId}`,
			params,
		});

		let instance = new Vehicle(raw);
		instance.api = this.api;

		return instance;
	}

	async *listVehicles({
		isActive,
		isApproved,
		regPlate,
		vin,
		sourceId,
		externalId,
		fullResponse,
		maxRecords,
	}: {
		isActive?: boolean;
		isApproved?: boolean;
		regPlate?: string | Search;
		vin?: string | Search;
		sourceId?: string | Search;
		externalId?: string | Search;
		fullResponse?: string;
		maxRecords?: number;
	}): AsyncGenerator<Vehicle, void, unknown> {
		let count = 0;

		let params = {};

		isActive ? (params = { ...params, isActive: isActive }) : null;
		isApproved ? (params = { ...params, isApproved: isApproved }) : null;
		vin ? (params = { ...params, vin: String(vin) }) : null;
		regPlate ? (params = { ...params, regPlate: String(regPlate) }) : null;
		sourceId ? (params = { ...params, sourceId: String(sourceId) }) : null;
		externalId ? (params = { ...params, externalId: String(externalId) }) : null;
		fullResponse ? (params = { ...params, full: fullResponse ? "true" : "false" }) : null;

		for await (let raw of this.api.batchFetch({
			endpoint: `registered-vehicles`,
			params: params,
		})) {
			if (maxRecords && count >= maxRecords) {
				break;
			}
			let instance = new Vehicle(raw);
			instance.api = this.api;
			yield instance;
			count++;
		}
	}

	async createVehicle({ vehicle, driverId, drv, sendWebhook = true }: { vehicle: Vehicle; driverId?: string; drv?: DriverVehicle; sendWebhook?: boolean }) {
		if (!driverId && drv) {
			throw new Error("You must provide a driverId if drv is provided");
		}

		if (!vehicle.vehicle) {
			throw new Error("You must provide a vehicleType");
		}

		if (!vehicle.vehicle?.id) {
			throw new Error("Vehicle Type ID is required");
		}

		let data = {
			...vehicle,
			vehicleId: vehicle.vehicle.id,
		};

		delete data.vehicle;

		let raw = await this.api.request({
			method: "POST",
			endpoint: `registered-vehicles`,
			data: data,
			params: {
				webhook: sendWebhook ? "true" : "false",
			},
		});

		let rv = new Vehicle(raw);
		rv.api = this.api;

		try {
			if (driverId) {
				if (!drv) {
					await rv.addDriver({
						driverId,
						displayName: vehicle.getDisplay(),
						isOwner: true,
						isPrimaryDriver: true,
					});
				} else {
					await rv.addDrv({
						driverId,
						drv,
					});
				}
			}
		} catch (e) {
			console.error(e);
			// await rv.delete();
			throw e;
		}

		return rv;
	}

	async *listVehicleTypes({
		brand,
		model,
		vehicleName,
		year,
		externalId,
		sourceId,
		isActive = true,
		internalFields,
		maxRecords,
	}: {
		brand?: string | Search;
		model?: string | Search;
		vehicleName?: string | Search;
		year?: string | number | Search;
		externalId?: string | Search;
		sourceId?: string | Search;
		isActive?: boolean;
		internalFields?: boolean;
		maxRecords?: number;
	}) {
		let count = 0;

		let params = {};

		brand ? (params = { ...params, brand: String(brand) }) : null;
		model ? (params = { ...params, model: String(model) }) : null;
		vehicleName ? (params = { ...params, vehicleName: String(vehicleName) }) : null;
		year ? (params = { ...params, year: String(year) }) : null;
		externalId ? (params = { ...params, externalId: String(externalId) }) : null;
		sourceId ? (params = { ...params, sourceId: String(sourceId) }) : null;
		isActive ? (params = { ...params, isActive: isActive }) : null;
		internalFields ? (params = { ...params, internalFields: internalFields }) : null;

		for await (let raw of this.api.batchFetch({
			endpoint: `vehicles`,
			params: params,
		})) {
			if (maxRecords && count >= maxRecords) {
				break;
			}
			let instance = new VehicleType(raw);
			instance.api = this.api;
			yield instance;
			count++;
		}
	}

	async createVehicleType({ vehicleType, sendWebhook }: { vehicleType: VehicleType; sendWebhook?: boolean }) {
		let raw = await this.api.request({
			method: "POST",
			endpoint: `vehicles`,
			data: vehicleType,
			params: {
				webhook: sendWebhook ? "true" : "false",
			},
		});

		let instance = new VehicleType(raw);
		instance.api = this.api;

		return instance;
	}
}
