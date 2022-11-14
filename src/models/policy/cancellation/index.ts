import { Cancellation } from "./interface";

export class PolicyCancellation {
	cancelledAt?: Date;
	message?: string;

	constructor(cancellation: Cancellation) {
		Object.assign(this, cancellation);
	}

	isCancelled() {
		return !!this.cancelledAt;
	}
}
