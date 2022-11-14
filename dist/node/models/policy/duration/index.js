"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyDuration = void 0;
class PolicyDuration {
    constructor(duration) {
        Object.assign(this, duration);
    }
    isExpired() {
        // Check if end is not null and has not passed
        // Add grace period to end date
        return !!this.end && this.end.getTime() + (this.gracePeriodMins || 0) * 60 * 1000 < Date.now();
    }
}
exports.PolicyDuration = PolicyDuration;
//# sourceMappingURL=index.js.map