import { regions } from "../../models/types";
import { OrgSettings } from "./org";
import request from "../helpers/request";
import { APIAuthError, APIError } from "./exceptions";
import Auth from "../auth";

export class APIHandlerNoAuth {
	url?: string;
	region?: string;
	orgId: string;
	telematicsUrl: string;
	orgUrl: string;
	orgData?: OrgSettings;
	orgDataRefreshing: boolean;

	constructor({ url, region, orgId }: { url?: string; region?: string; orgId: string }) {
		this.url = url;
		this.region = region;
		this.orgId = orgId;
		this.orgDataRefreshing = false;

		if (!this.url && !this.region) {
			throw new Error("Must provide either a url or a region");
		}

		if (this.url) {
			// Remove trailing slash
			if (this.url.endsWith("/")) {
				this.url = this.url.slice(0, -1);
			}
		}

		if (!this.url) {
			// Check if region is valid
			if (region && !Object.values(regions).includes(region as regions)) {
				throw new Error(`Invalid region. Must be one of: ${Object.values(regions).join(", ")}`);
			}

			// Set url based on region
			this.url = `https://${this.region}.nsurely-motor.com/v1/api`;
		}

		this.telematicsUrl = `https://${this.region}.nsurely-motor.com/v1/telematics`;
		this.orgUrl = `${this.url}/org/${this.orgId}`;
	}

	async request({
		method,
		endpoint,
		params,
		data,
		headers,
		urlOverride,
	}: {
		method: string;
		endpoint?: string;
		params?: object;
		data?: any;
		headers?: any;
		urlOverride?: string;
	}) {
		if (!this.orgData && !this.orgDataRefreshing) {
			this.orgDataRefreshing = true;
			this.refreshOrgData();
		}

		if (data) {
			data = {
				...data,
			};
			// check if data has api, remove it
			if (data.api) {
				delete data.api;
			}
		}

		let { body, status } = await request({
			method,
			url: urlOverride ? urlOverride : `${this.orgUrl}/${endpoint}`,
			params,
			data,
			headers,
		});

		if (status < 300) {
			return body;
		} else if (status === 401) {
			throw new APIAuthError("Not authenticated");
		} else {
			throw new APIError(`Api responded with status code ${status}`);
		}
	}

	async refreshOrgData() {
		this.orgDataRefreshing = true;
		this.orgData = await this.request({
			urlOverride: `${this.url}/public/${this.orgId}`,
			method: "GET",
		});

		this.orgDataRefreshing = false;
	}

	async *batchFetch({
		endpoint,
		params,
		headers,
		limit = 50,
		offset = 0,
	}: {
		endpoint: string;
		params?: object;
		headers?: any;
		limit?: number;
		offset?: number;
	}): AsyncGenerator<any, void, unknown> {
		params = {
			...params,
			limit,
			offset,
		};

		// While true
		while (true) {
			// Fetch next page
			let body = await this.request({
				method: "GET",
				endpoint,
				params: {
					...params,
					offset,
				},
				headers,
			});

			// If no data, break
			if (!body || body.length === 0) {
				break;
			}

			for (let item of body) {
				yield item;
			}

			// If there are no more results, break
			if (body.length < limit) {
				break;
			}

			// Increase offset
			offset += limit;
		}
	}
}

export class APIHandlerAuth {
	url?: string;
	region?: string;
	orgId: string;
	telematicsUrl: string;
	orgUrl: string;
	orgData?: OrgSettings;
	orgDataRefreshing: boolean;
	auth: Auth;

	constructor({ url, region, orgId, auth }: { url?: string; region?: string; orgId: string; auth: Auth }) {
		this.url = url;
		this.region = region;
		this.orgId = orgId;
		this.auth = auth;
		this.orgDataRefreshing = false;

		if (!this.url && !this.region) {
			throw new Error("Must provide either a url or a region");
		}

		if (this.url) {
			// Remove trailing slash
			if (this.url.endsWith("/")) {
				this.url = this.url.slice(0, -1);
			}
		}

		if (!this.url) {
			// Check if region is valid
			if (region && !Object.values(regions).includes(region as regions)) {
				throw new Error(`Invalid region. Must be one of: ${Object.values(regions).join(", ")}`);
			}

			// Set url based on region
			this.url = `https://${this.region}.nsurely-motor.com/v1/api`;
		}

		this.telematicsUrl = `https://${this.region}.nsurely-motor.com/v1/telematics`;
		this.orgUrl = `${this.url}/org/${this.orgId}`;
	}

	async makeRequest({ method, params, data, headers, url }: { method: string; params?: object; data?: any; headers?: any; url: string }) {
		if (this.auth.requiresRefresh()) {
			await this.auth.refresh();
		}

		headers = {
			...headers,
			...this.auth.getHeaders(),
		};

		return await request({
			method,
			url: url,
			params,
			data,
			headers,
		});
	}

	async refreshOrgData() {
		this.orgDataRefreshing = true;
		this.orgData = await this.request({
			urlOverride: `${this.url}/public/${this.orgId}`,
			method: "GET",
		});

		this.orgDataRefreshing = false;
	}

	authOk(): boolean {
		if (!this.auth.isLoggedIn()) {
			return false;
		}
		if (this.auth.requiresRefresh()) {
			return false;
		}
		return true;
	}

	async checkAuth(): Promise<void> {
		if (!this.authOk()) {
			if (!this.auth.isLoggedIn()) {
				await this.auth.login();
				return;
			}
			if (this.auth.requiresRefresh()) {
				await this.auth.refresh();
				return;
			}
		}
		return;
	}

	async request({
		method,
		endpoint,
		params,
		data,
		headers,
		urlOverride,
	}: {
		method: string;
		endpoint?: string;
		params?: object;
		data?: any;
		headers?: any;
		urlOverride?: string;
	}) {
		if (!this.orgData && !this.orgDataRefreshing) {
			this.orgDataRefreshing = true;
			await this.refreshOrgData();
		}

		await this.checkAuth();

		if (data) {
			data = {
				...data,
			};
			// check if data has api, remove it
			if (data.api) {
				delete data.api;
			}
		}

		let response = await this.makeRequest({
			method,
			url: urlOverride ? urlOverride : `${this.orgUrl}/${endpoint}`,
			params,
			data,
			headers,
		});

		let body = response?.body || {};
		let status = response?.status || 0;

		if (status === 401) {
			await this.checkAuth();
			headers = {
				...headers,
				...this.auth.getHeaders(),
			};
			let response = await this.makeRequest({
				method,
				url: urlOverride ? urlOverride : `${this.orgUrl}/${endpoint}`,
				params,
				data,
				headers,
			});

			body = response?.body || {};
			status = response?.status || 0;
		}

		if (status < 300) {
			return body;
		} else if (status === 401) {
			throw new APIAuthError("Not authenticated");
		} else {
			throw new APIError(`Api responded with status code ${status}`);
		}
	}

	async telematicsRequest({ method, endpoint, params, data, headers }: { method: string; endpoint?: string; params?: object; data?: any; headers?: any }) {
		if (data) {
			data = {
				...data,
			};
			// check if data has api, remove it
			if (data.api) {
				delete data.api;
			}
		}

		let url = `${this.telematicsUrl}/${endpoint}`;
		let response = await this.makeRequest({
			method,
			url,
			params,
			data,
			headers,
		});

		let body = response?.body || {};
		let status = response?.status || 0;

		if (status === 401) {
			await this.checkAuth();
			headers = {
				...headers,
				...this.auth.getHeaders(),
			};
			let response = await this.makeRequest({
				method,
				url,
				params,
				data,
				headers,
			});

			body = response?.body || {};
			status = response?.status || 0;
		}

		if (status < 300) {
			return body;
		} else if (status === 401) {
			throw new APIAuthError("Not authenticated");
		} else {
			throw new APIError(`Api responded with status code ${status}`);
		}
	}

	async *batchFetch({
		endpoint,
		params,
		headers,
		limit = 50,
		offset = 0,
	}: {
		endpoint: string;
		params?: object;
		headers?: any;
		limit?: number;
		offset?: number;
	}): AsyncGenerator<any, void, unknown> {
		params = {
			...params,
			limit,
			offset,
		};

		// While true
		while (true) {
			// Fetch next page
			let body = await this.request({
				method: "GET",
				endpoint,
				params: {
					...params,
					offset,
				},
				headers,
			});

			// If no data, break
			if (!body || body.length === 0) {
				break;
			}

			for (let item of body) {
				yield item;
			}

			// If there are no more results, break
			if (body.length < limit) {
				break;
			}

			// Increase offset
			offset += limit;
		}
	}
}
