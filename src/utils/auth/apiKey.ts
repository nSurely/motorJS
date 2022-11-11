import { APIKeyAuthError } from "./exceptions";

export class APIKeyAuth {
	apiKey: string;
	apiSecret: string;
	headers: object | undefined;

	constructor(key: string, secret: string) {
		this.apiKey = key;
		this.apiSecret = secret;
		this.headers = undefined;

		if (!this.apiKey) {
			throw new APIKeyAuthError("API key is required.");
		}

		if (!this.apiSecret) {
			throw new APIKeyAuthError("API secret is required.");
		}

		// Strip whitespace from the key and secret
		this.apiKey = this.apiKey.trim();
		this.apiSecret = this.apiSecret.trim();
	}

	requiresRefresh(): boolean {
		return false;
	}

	async refresh(): Promise<void> {
		return;
	}

	getToken(): string {
		return `${this.apiKey}:${this.apiSecret}`;
	}

	getHeaders(): object {
		if (!this.headers) {
			this.headers = {
				Authorization: `apikey ${this.getToken()}`,
			};
		}
		return this.headers;
	}

	isLoggedIn(): boolean {
		return true;
	}

    async login(): Promise<boolean> {
		return true;
	}

    async logout(): Promise<boolean> {
        return true;
    }
}
