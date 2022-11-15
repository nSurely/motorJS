import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
import { BillingAccountBase } from "../accounts/interface";
import { BillingEventBase } from "./interface";
export declare class BillingEvent {
    api: APIHandlerAuth | APIHandlerNoAuth;
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
    constructor(billingEvent: BillingEventBase);
    getCurrency(): string | undefined;
    isApproved(): boolean;
    update(data: Object): void;
    updateStatus({ status, paymentId }: {
        status: string;
        paymentId?: string;
    }): void;
}
//# sourceMappingURL=index.d.ts.map