"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyCancellation = void 0;
class PolicyCancellation {
    constructor(cancellation) {
        Object.assign(this, cancellation);
    }
    isCancelled() {
        return !!this.cancelledAt;
    }
}
exports.PolicyCancellation = PolicyCancellation;
//# sourceMappingURL=index.js.map