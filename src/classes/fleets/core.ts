import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { Fleet } from "../../models/fleets";

export class Fleets {
	storageManager!: StorageManager;
	api!: APIHandlerAuth | APIHandlerNoAuth;

	async getFleet({ fleetId, query }: { fleetId: string; query: object }) {
		let raw = await this.api.request({
			method: "GET",
			endpoint: `fleets/${fleetId}`,
			params: query,
		});

		let instance = new Fleet(raw);
		instance.api = this.api;
		return instance;
	}

	async *listFleets({ maxRecords }: { maxRecords: number }): AsyncGenerator<Fleet, void, unknown> {
		let count = 0;

		for await (let raw of this.api.batchFetch({
			endpoint: `fleets`,
		})) {
			if (maxRecords && count >= maxRecords) {
				break;
			}
			let instance = new Fleet(raw);
			instance.api = this.api;
			yield instance;
			count++;
		}
	}

	async createFleet({ fleet }: { fleet: Fleet }) {
		let raw = await this.api.request({
			method: "POST",
			endpoint: `fleets`,
			params: fleet,
		});

		let instance = new Fleet(raw);
		instance.api = this.api;
		return instance;
	}
}
