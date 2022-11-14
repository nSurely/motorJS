import { Approval } from "./interface";

export class PolicyApproval {
	approvedAt?: Date;
	autoApproved?: boolean;
	approvedBy?: null;

	constructor(approval: Approval) {
		Object.assign(this, approval);
	}

    isApproved() {
        return !!this.approvedAt || this.autoApproved === true;
    }
}
