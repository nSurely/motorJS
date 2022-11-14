"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyApproval = void 0;
class PolicyApproval {
    constructor(approval) {
        Object.assign(this, approval);
    }
    isApproved() {
        return !!this.approvedAt || this.autoApproved === true;
    }
}
exports.PolicyApproval = PolicyApproval;
//# sourceMappingURL=index.js.map