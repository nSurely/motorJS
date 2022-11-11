import { AuthError } from "./exceptions";
import { APIKeyAuth } from "./apiKey";
import { DriverAuth } from "./driver";
import { UserAuth } from "./user";
import { regions } from "../../models/types";

enum AuthType {
	API_KEY = 1,
	JWT_DRIVER = 2,
	JWT_USER = 3,
}

export class Auth {
	apiKey?: string;
	apiSecret?: string;
	email?: string;
	password?: string;
	accountType?: string;
	authMethod: AuthType | undefined;
	authObject: APIKeyAuth | DriverAuth | UserAuth;
	region?: string;
	url: string | undefined;
	orgId: string;

	constructor({
		apiKey,
		apiSecret,
		email,
		password,
		accountType,
		orgId,
		region,
		url,
	}: {
		apiKey?: string;
		apiSecret?: string;
		email?: string;
		password?: string;
		accountType?: string;
		orgId: string;
		region?: string;
		url?: string;
	}) {
		this.apiKey = apiKey;
		this.apiSecret = apiSecret;
		this.email = email;
		this.password = password;
		this.accountType = accountType;
		this.region = region;
		this.url = url;
		this.orgId = orgId;

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

		if (this.apiKey) {
			if (!this.apiSecret) {
				// Check if apiSecret does not have ':' in it
				if (this.apiKey.indexOf(":") === -1) {
					throw new AuthError('Invalid API key. API key must be in the format "key:secret".');
				}
				// Split the apiSecret into key and secret
				[this.apiKey, this.apiSecret] = this.apiKey.split(":");
			}
			this.authMethod = AuthType.API_KEY;
			this.authObject = new APIKeyAuth(this.apiKey, this.apiSecret);
		} else if (this.email && this.password) {
			if (!this.accountType) {
				throw new AuthError("Account type must be specified.");
			}
			if (this.accountType === "driver") {
				console.log("Auth object is driver");
				this.authMethod = AuthType.JWT_DRIVER;
				this.authObject = new DriverAuth({
					email: this.email,
					password: this.password,
					url: this.url,
					region: this.region,
					orgId: this.orgId,
					authType: this.accountType,
				});
			} else if (this.accountType === "user") {
				this.authMethod = AuthType.JWT_USER;
				this.authObject = new UserAuth({
					email: this.email,
					password: this.password,
					url: this.url,
					region: this.region,
					orgId: this.orgId,
					authType: this.accountType,
				});
			} else {
				throw new AuthError("Invalid account type.");
			}
		} else {
			throw new AuthError("Auth credentials are missing.");
		}
	}

	requiresRefresh() {
		return this.authObject.requiresRefresh();
	}

	async refresh() {
		await this.authObject.refresh();
	}

	async login() {
		if (this.authMethod === AuthType.API_KEY) {
			return true;
		}
		if (this.email && this.password) {
			console.log("Logging in...");
			return await this.authObject.login(this.email, this.password);
		}
	}

	async logout() {
		return await this.authObject.logout();
	}

	getToken() {
		return this.authObject.getToken();
	}

	getHeaders() {
		return this.authObject.getHeaders();
	}

	isLoggedIn() {
		return this.authObject.isLoggedIn();
	}
}
