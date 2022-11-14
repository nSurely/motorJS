"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingAccount = void 0;
class BillingAccount {
    constructor(billingAccount) {
        Object.assign(this, billingAccount);
    }
    getDisplay() {
        if (!this.card) {
            return "Unknown";
        }
        return `${this.isPrimary ? "Primary " : ""}${this.card.name} - ${this.card.lastFour}`;
    }
}
exports.BillingAccount = BillingAccount;
//# sourceMappingURL=index.js.map