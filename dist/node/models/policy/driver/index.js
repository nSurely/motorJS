"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyDriver = void 0;
class PolicyDriver {
    constructor(driver) {
        Object.assign(this, driver);
    }
    isAgreed() {
        return !!this.agreedAt;
    }
}
exports.PolicyDriver = PolicyDriver;
//# sourceMappingURL=index.js.map