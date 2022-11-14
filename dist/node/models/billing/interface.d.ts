import { BillingAccountBase } from "./accounts/interface";
export interface BillingEventBase {
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
}
//# sourceMappingURL=interface.d.ts.map