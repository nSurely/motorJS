import { JWTAuth } from "./jwt";
import request from "../helpers/request";
import { regions } from "../../models/types";

export class UserAuth extends JWTAuth {
	constructor({ url, region, orgId, authType, email, password }: { url?: string; region?: string; orgId: string; authType?: string; email: string; password: string }) {
		super({ url, region, orgId, authType, email, password });
	}
}
