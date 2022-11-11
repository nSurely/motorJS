import request from "../helpers/request";
import { regions } from "../../models/types";

export class JWTAuth {
	url?: string;
	region?: string;
	orgId: string;
	authType?: string;
	email: string;
	password: string;
	tokenType?: string;
	accessToken?: string;
	expiresIn?: number;
	refreshToken?: string;
	refreshTokenExpiresIn?: number;
	lastRefreshTime?: EpochTimeStamp;
	accountId?: string;
	accountType?: string;
	orgs?: Array<{
		id: string;
		display: string;
	}>;
	loginUrl: string;
	refreshUrl: string;
	logoutUrl: string;

	constructor({ url, region, orgId, authType, email, password }: { url?: string; region?: string; orgId: string; authType?: string; email: string; password: string }) {
		this.url = url;
		this.region = region;
		this.orgId = orgId;
		this.authType = authType;
		this.email = email;
		this.password = password;
		this.tokenType = undefined;
		this.accessToken = undefined;
		this.expiresIn = undefined;
		this.refreshToken = undefined;
		this.refreshTokenExpiresIn = undefined;
		this.lastRefreshTime = undefined;
		this.accountId = undefined;
		this.accountType = undefined;
		this.orgs = [];

		if (this.authType !== "driver" && this.authType !== "user") {
			throw new Error("Invalid authType. Must be 'driver' or 'user'");
		}

        if(this.url) {
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

		if (this.authType === "user") {
			this.loginUrl = `${this.url}/org/auth/users/login`;
			this.refreshUrl = `${this.url}/org/auth/users/refresh`;
			this.logoutUrl = `${this.url}/org/auth/users/logout`;
		} else if (this.authType === "driver") {
			this.loginUrl = `${this.url}/org/${this.orgId}/auth/drivers/login`;
			this.refreshUrl = `${this.url}/org/${this.orgId}/auth/drivers/refresh`;
			this.logoutUrl = `${this.url}/org/${this.orgId}/auth/drivers/logout`;
		} else {
			throw new Error("Invalid authType. Must be 'driver' or 'user'");
		}
	}

	refreshExpired(): boolean {
		if (!this.lastRefreshTime) {
			return true;
		}
		if (!this.refreshTokenExpiresIn) {
			return true;
		}
		// Check if refresh token is expired
		if (this.refreshTokenExpiresIn - (Date.now() - this.lastRefreshTime) < 0) {
			return true;
		}
		return false;
	}

	requiresRefresh(): boolean {
		if (!this.accessToken) {
			return true;
		}
		if (!this.expiresIn) {
			return true;
		}
		if (!this.lastRefreshTime) {
			return true;
		}
		if (this.expiresIn - (Date.now() - this.lastRefreshTime) < 0) {
			return true;
		}
		return false;
	}

	async login(email: string, password: string): Promise<string | undefined> {
		const response = await request({
			method: "POST",
			url: this.loginUrl,
			data: {
				email: email,
				password: password,
			},
		});

		this.tokenType = response.body?.tokenType;
		this.accessToken = response.body?.accessToken;
		this.expiresIn = response.body?.expiresIn;
		this.refreshToken = response.body?.refreshToken;
		this.refreshTokenExpiresIn = response.body?.refreshTokenExpiresIn;
		this.accountId = response.body?.accountId;
		this.accountType = response.body?.accountType;

		if (this.authType === "user") {
			this.orgs = response.body?.orgs;
		}

		this.lastRefreshTime = Date.now();

		return this.accessToken;
	}

	async logout() {
		if (this.isLoggedIn()) {
			await request({
				method: "POST",
				url: this.logoutUrl,
				data: {
					refreshToken: this.refreshToken,
				},
			});
            this.accessToken = undefined;
            this.refreshToken = undefined;
            this.expiresIn = undefined;
            this.refreshTokenExpiresIn = undefined;
            this.lastRefreshTime = undefined;
		}
	}

	isLoggedIn(): boolean {
		if (!this.accessToken) {
			return false;
		}
		if (!this.expiresIn) {
			return false;
		}
		if (!this.lastRefreshTime) {
			return false;
		}
		if (!this.refreshTokenExpiresIn) {
			return false;
		}

		if (this.refreshTokenExpiresIn - (Date.now() - this.lastRefreshTime) < 0) {
			return true;
		}

		return true;
	}

	async refresh(): Promise<string | undefined> {
		if (this.refreshExpired()) {
			throw new Error("Refresh token expired due to inactivity. Please login again.");
		}

		const response = await request({
			method: "POST",
			url: this.refreshUrl,
			data: {
				refreshToken: this.refreshToken,
			},
		});

		this.tokenType = response.body?.tokenType;
		this.accessToken = response.body?.accessToken;
		this.expiresIn = response.body?.expiresIn;
		this.refreshToken = response.body?.refreshToken;
		this.refreshTokenExpiresIn = response.body?.refreshTokenExpiresIn;
		this.accountId = response.body?.accountId;
		this.accountType = response.body?.accountType;

		this.lastRefreshTime = Date.now();

		return this.accessToken;
	}

	getToken() {
		if (!this.accessToken) {
			throw new Error("No access token or refresh token found. Please login first.");
		}
		return `Bearer ${this.accessToken}`;
	}

	getHeaders() {
		if (!this.accessToken) {
			return {};
		}
		return {
			Authorization: this.getToken(),
		};
	}
}
