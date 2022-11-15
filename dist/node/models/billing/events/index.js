"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingEvent = void 0;
const billingEventStatus = ["pending", "paid", "failed", "cancelled", "refunded"];
class BillingEvent {
    constructor(billingEvent) {
        Object.assign(this, billingEvent);
    }
    getCurrency() {
        if (!this.billingAccount) {
            return undefined;
        }
        return this.billingAccount.currencyIsoCode;
    }
    isApproved() {
        return this.approvalAt ? true : false;
    }
    update(data) {
        this.api.request({
            method: "PATCH",
            endpoint: `billing-events/${this.id}`,
            data: data,
        });
    }
    updateStatus({ status, paymentId }) {
        // Check if staus is one of billingEventStatus
        if (!billingEventStatus.includes(status)) {
            throw new Error(`Invalid status: ${status} - can only be one of ${billingEventStatus.join(", ")}`);
        }
        let data = {};
        data = {
            status: status,
        };
        if (paymentId) {
            data = Object.assign(Object.assign({}, data), { paymentId: paymentId });
        }
        this.update(data);
        this.status = status;
    }
}
exports.BillingEvent = BillingEvent;
//# sourceMappingURL=index.js.map