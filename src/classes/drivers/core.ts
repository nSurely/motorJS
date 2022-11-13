import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { Driver } from "../../models/drivers";
import { DriverBase } from "../../models/drivers/interface";

export class Drivers {
	storageManager!: StorageManager;
	api!: APIHandlerAuth | APIHandlerNoAuth;

	/**
	 * Returns a drivers record.
	 * @returns {Promise<Driver>}
	 *
	 * @param {string} driverId - The ID of the driver to retrieve.
	 * @param {boolean} risk - Whether to include the driver's risk data. Defaults to true
	 * @param {boolean} address - Whether to include the driver's address data. Defaults to true
	 * @param {boolean} fleets - Whether to include the driver's fleet data. Defaults to true
	 * @param {boolean} vehicleCount - Whether to include the driver's vehicle count. Defaults to true
	 * @param {boolean} distance - Whether to include the driver's distance data. Defaults to true
	 * @param {boolean} points - Whether to include the driver's points data. Defaults to true
	 * @param {boolean} files - Whether to include the driver's files data. Defaults to true
	 * @param {boolean} contact - Whether to include the driver's contact data. Defaults to true
	 * @param {boolean} occupation - Whether to include the driver's occupation data. Defaults to true
	 */

	async getDriver({
		driverId,
		risk = true,
		address = true,
		fleets = true,
		vehicleCount = false,
		distance = false,
		points = true,
		files = true,
		contact = true,
		occupation = true,
	}: {
		driverId: string;
		risk?: boolean;
		address?: boolean;
		fleets?: boolean;
		vehicleCount?: boolean;
		distance?: boolean;
		points?: boolean;
		files?: boolean;
		contact?: boolean;
		occupation?: boolean;
	}) {
		let params = {
			risk,
			address,
			fleets,
			vehicleCount,
			distance,
			points,
			files,
			contact,
			occupation,
		};

		let raw = await this.api.request({
			method: "GET",
			endpoint: `drivers/${driverId}`,
			params,
		});

		let instance = new Driver(raw);
		instance.api = this.api;

		return instance;
	}

	async *listDrivers({
		dob,
		email,
		firstName,
		lastName,
		externalId,
		isActive,
		maxRecords,
	}: {
		dob?: string;
		email?: string;
		firstName?: string;
		lastName?: string;
		externalId?: string;
		isActive?: boolean;
		maxRecords?: number;
	}): AsyncGenerator<Driver> {
		let count = 0;

		let params = {};
		dob ? (params = { ...params, dob }) : null;
		email ? (params = { ...params, email }) : null;
		firstName ? (params = { ...params, firstName }) : null;
		lastName ? (params = { ...params, lastName }) : null;
		externalId ? (params = { ...params, externalId }) : null;
		isActive ? (params = { ...params, isActive }) : null;

		for await (let raw of this.api.batchFetch({
			endpoint: `drivers`,
			params: params,
		})) {
			if (maxRecords && count >= maxRecords) {
				break;
			}
			let instance = new Driver(raw);
			yield instance;
			count++;
		}
	}

	async createDriver({ driver, password, sendInvite, sendWebhook }: { driver: DriverBase; password?: string; sendInvite?: boolean; sendWebhook?: boolean }) {
		if (!password && !sendInvite) {
			throw new Error("You must provide a password if sendInvite is false");
		}
		if (password && sendInvite) {
			throw new Error("You cannot provide a password if sendInvite is true");
		}

		let raw = await this.api.request({
			method: "POST",
			endpoint: `drivers`,
			data: {
				...driver,
				password,
			},
			params: {
				webhook: sendWebhook ? "true" : "false",
				invite: sendInvite ? "true" : "false",
			},
		});

		let instance = new Driver(raw);

		return instance;
	}
}
