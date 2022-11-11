"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
class Driver {
    constructor(driver) {
        Object.assign(this, driver);
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
exports.Driver = Driver;
//# sourceMappingURL=index.js.map