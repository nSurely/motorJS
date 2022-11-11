import { JWTAuth } from "./jwt";
import request from "../helpers/request";
import { regions } from "../../models/types";

export class DriverAuth extends JWTAuth {
	constructor({ url, region, orgId, authType, email, password }: { url?: string; region?: string; orgId: string; authType?: string; email: string; password: string }) {
		super({ url, region, orgId, authType, email, password });
	}

	async signup({
		email,
		password,
		firstName,
		lastName,
		fields,
		login,
	}: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		fields?: object;
		login: boolean;
	}): Promise<void> {
		fields = fields || {};
		const body = {
			email,
			password,
			firstName,
			lastName,
			...fields,
		};
		const response = await request({
			url: `${this.url}/org/${this.orgId}/auth/drivers/signup`,
			method: "POST",
			data: body,
		});

		if (login) {
			await this.login(email, password);
		}

		return response.body;
	}
}
