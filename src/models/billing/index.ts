import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { BillingAccountBase } from "./accounts/interface";
import { BillingEventBase } from "./interface";

const billingEventStatus = ["pending", "paid", "failed", "cancelled", "refunded"];

export class BillingEvent {
	api!: APIHandlerAuth | APIHandlerNoAuth;
	externalId?: string;
	paymentId?: string;
	amount?: number;
	message?: string;
	paymentOut?: boolean;
	paymentDate?: Date;
	status?: string;
	approvalAt?: Date;
	policyId?: string;
	type?: string;
	id?: string;
	createdAt?: Date;
	billingAccount?: BillingAccountBase;
	approvalBy?: string;

	constructor(billingEvent: BillingEventBase) {
		Object.assign(this, billingEvent);
	}

	getCurrency(): string | undefined {
		if (!this.billingAccount) {
			return undefined;
		}
		return this.billingAccount.currencyIsoCode;
	}

	isApproved(): boolean {
		return this.approvalAt ? true : false;
	}

	update(data: Object) {
		this.api.request({
			method: "PATCH",
			endpoint: `billing-events/${this.id}`,
			data: data,
		});
	}

	updateStatus({ status, paymentId }: { status: string; paymentId?: string }) {
		// Check if staus is one of billingEventStatus
		if (!billingEventStatus.includes(status)) {
			throw new Error(`Invalid status: ${status} - can only be one of ${billingEventStatus.join(", ")}`);
		}

		let data = {};

		data = {
			status: status,
		};

		if (paymentId) {
			data = {
				...data,
				paymentId: paymentId,
			};
		}

		this.update(data);

		this.status = status;
	}
}
