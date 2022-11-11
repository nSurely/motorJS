import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { DriverVehicle } from "../../models/vehicles/drv";
import { Vehicle } from "../../models/vehicles/rv";
import { Driver } from "../../models/drivers";
import { DriverBase } from "../../models/drivers/interface";
import { DriverRegisteredVehicleBase } from "../../models/vehicles/drv/interface";

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
		regPlate,
		vin,
		isActive,
		isApproved,
		fullResponse,
		maxRecords,
	}: {
		regPlate?: string;
		vin?: string;
		isActive?: string;
		isApproved?: string;
		fullResponse?: string;
		maxRecords?: number;
	}): AsyncGenerator<Vehicle, void, unknown> {
		let count = 0;

		for await (let raw of this.api.batchFetch({
			endpoint: `registered-vehicles`,
			params: {
				regPlate,
				vin,
				isActive,
				isApproved,
				full: fullResponse ? "true" : "false",
			},
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

	async createVehicle({ vehicle, driverId, drv, sendWebhook = true }: { vehicle: Vehicle; driverId?: string; drv?: DriverRegisteredVehicleBase; sendWebhook?: boolean }) {
		if (!driverId && drv) {
			throw new Error("You must provide a driverId if drv is provided");
		}

		if(!vehicle.vehicle) {
			throw new Error("You must provide a vehicleType");
		}

		if (!vehicle.vehicle?.id) {
			throw new Error("Vehicle Type ID is required");
		}

		let raw = await this.api.request({
			method: "POST",
			endpoint: `registered-vehicles`,
			data: {
				...vehicle,
				vehicleId: vehicle.vehicle.id,
			},
			params: {
				webhook: sendWebhook ? "true" : "false",
			},
		});

		let instance = new Vehicle(raw);

		return instance;
	}
}
