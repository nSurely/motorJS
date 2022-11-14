import { Driver } from "./interface";

export class PolicyDriver {
	esignature?: string;
	esignatureFingerprint?: Object;
	agreedAt?: Date;

	constructor(driver: Driver) {
		Object.assign(this, driver);
	}

	isAgreed() {
		return !!this.agreedAt;
	}
}
