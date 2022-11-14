import { Duration } from "./interface";

export class PolicyDuration {
	start?: Date;
	end?: Date;
	gracePeriodMins?: number;

	constructor(duration: Duration) {
		Object.assign(this, duration);
	}

	isExpired() {
		// Check if end is not null and has not passed
		// Add grace period to end date
		return !!this.end && this.end.getTime() + (this.gracePeriodMins || 0) * 60 * 1000 < Date.now();
	}
}
