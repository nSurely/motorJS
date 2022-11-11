import { APIHandlerAuth, APIHandlerNoAuth } from "../utils/api";
import { deleteFromObject } from "../utils/helpers";

export class PrivateApiHandler {
	api!: APIHandlerAuth | APIHandlerNoAuth;

	async _update({
		persist,
		endpoint,
		fields,
		exclude,
		params,
	}: {
		persist?: boolean;
		endpoint?: string;
		fields?: Object;
		exclude?: string[];
		params?: Object;
	}): Promise<void> {
		if (!fields) {
			return;
		}
		// Update the instance
		Object.assign(this, {
			...this,
			...fields,
		});
		if (persist && endpoint) {
			await this._save({ endpoint, fields, exclude, params });
		}
	}

	async _save({ endpoint, fields, exclude = [], params }: { endpoint: string; fields?: Object; exclude?: string[]; params?: Object }) {
		if (!this.api) {
			throw new Error("APIHandler not initialised");
		}
		let body = null;
		if (!fields) {
			body = {
				...this,
			};
			exclude = exclude.concat(["api", "id", "createdAt"]);

			for (let field of exclude) {
				deleteFromObject(field, body);
			}
		} else {
			body = {
				...fields,
			};
		}

		if (!fields) {
			return;
		}

		return this.api.request({
			method: "PATCH",
			endpoint: endpoint,
			params: params,
			data: body,
		});
	}
}
