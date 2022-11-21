"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
const approval_1 = require("./approval");
const cancellation_1 = require("./cancellation");
const driver_1 = require("./driver");
const duration_1 = require("./duration");
const custom_1 = require("../custom");
const group_1 = require("./enums/group");
class Policy extends custom_1.PrivateApiHandler {
    constructor(policy) {
        super();
        policy.approval = policy.approval ? new approval_1.PolicyApproval(policy.approval) : undefined;
        policy.cancellation = policy.cancellation ? new cancellation_1.PolicyCancellation(policy.cancellation) : undefined;
        policy.driver = policy.driver ? new driver_1.PolicyDriver(policy.driver) : undefined;
        policy.duration = policy.duration ? new duration_1.PolicyDuration(policy.duration) : undefined;
        Object.assign(this, policy);
    }
    isCancelled() {
        var _a;
        return (_a = this.cancellation) === null || _a === void 0 ? void 0 : _a.isCancelled();
    }
    isApproved() {
        var _a;
        return (_a = this.approval) === null || _a === void 0 ? void 0 : _a.isApproved();
    }
    isExpired() {
        var _a;
        return (_a = this.duration) === null || _a === void 0 ? void 0 : _a.isExpired();
    }
    isDriverAgreed() {
        var _a;
        return (_a = this.driver) === null || _a === void 0 ? void 0 : _a.isAgreed();
    }
    isLive() {
        return this.isActivePolicy && this.isApproved() && !this.isCancelled() && !this.isExpired() && this.isDriverAgreed();
    }
    ratePerKm() {
        var _a, _b, _c;
        if (!((_a = this.rates) === null || _a === void 0 ? void 0 : _a.enabled)) {
            return undefined;
        }
        return (_c = (_b = this.final) === null || _b === void 0 ? void 0 : _b.rates) === null || _c === void 0 ? void 0 : _c.value;
    }
    ratePerMile() {
        var _a, _b, _c, _d, _e;
        if (!((_a = this.rates) === null || _a === void 0 ? void 0 : _a.enabled)) {
            return undefined;
        }
        return ((_c = (_b = this.final) === null || _b === void 0 ? void 0 : _b.rates) === null || _c === void 0 ? void 0 : _c.value) ? ((_e = (_d = this.final) === null || _d === void 0 ? void 0 : _d.rates) === null || _e === void 0 ? void 0 : _e.value) * 1.60934 : undefined;
    }
    premiumAmount() {
        var _a, _b;
        return (_b = (_a = this.final) === null || _a === void 0 ? void 0 : _a.premium) === null || _b === void 0 ? void 0 : _b.value;
    }
    _checkId() {
        if (!this.id) {
            throw new Error("ID must be set");
        }
    }
    refesh() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            const policy = yield this.api.request({
                method: "GET",
                endpoint: `policy/${this.id}`,
            });
            policy.approval = policy.approval ? new approval_1.PolicyApproval(policy.approval) : undefined;
            policy.cancellation = policy.cancellation ? new cancellation_1.PolicyCancellation(policy.cancellation) : undefined;
            policy.driver = policy.driver ? new driver_1.PolicyDriver(policy.driver) : undefined;
            policy.duration = policy.duration ? new duration_1.PolicyDuration(policy.duration) : undefined;
            Object.assign(this, policy);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            yield this.api.request({
                method: "DELETE",
                endpoint: `policy/${this.id}`,
            });
        });
    }
    save(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            return yield this._save({
                endpoint: `policy/${this.id}`,
                fields,
            });
        });
    }
    update(persist = false, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            this._update({
                endpoint: `policy/${this.id}`,
                fields,
                persist,
            });
        });
    }
    create({ api, recordId, driverId, vehicleId }) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            if (this.policyGroup === group_1.policyGroup.D) {
                if (driverId && recordId !== driverId) {
                    recordId = driverId;
                }
            }
            else if (this.policyGroup === group_1.policyGroup.DRV) {
                //
            }
            else if (this.policyGroup === group_1.policyGroup.RV) {
                //
            }
            else if (this.policyGroup === group_1.policyGroup.FD) {
                if (!driverId) {
                    throw new Error("Driver ID must be supplied for FD policy");
                }
                if (recordId == driverId) {
                    throw new Error("RecordId (fleet id) must not be the same as driverId for FD policy");
                }
                params = {
                    driverId,
                };
            }
            else if (this.policyGroup === group_1.policyGroup.FDRV) {
                if (!driverId) {
                    throw new Error("Driver ID must be supplied for FDRV policy");
                }
                if (!vehicleId) {
                    throw new Error("Vehicle ID must be supplied for FDRV policy");
                }
                params = {
                    driverId,
                    vehicleId,
                };
                if (recordId == driverId || recordId == vehicleId) {
                    throw new Error("RecordId (fleet id) must not be the same as driverId or vehicleId for FDRV policy");
                }
            }
            else if (this.policyGroup === group_1.policyGroup.FRV) {
                if (!vehicleId) {
                    throw new Error("Vehicle ID must be supplied for FRV policy");
                }
                if (recordId == vehicleId) {
                    throw new Error("RecordId (fleet id) must not be the same as vehicleId for FRV policy");
                }
                params = {
                    vehicleId,
                };
            }
            const raw = yield api.request({
                method: "POST",
                endpoint: `policy/${recordId}`,
                params,
                data: this,
            });
            raw.approval = raw.approval ? new approval_1.PolicyApproval(raw.approval) : undefined;
            raw.cancellation = raw.cancellation ? new cancellation_1.PolicyCancellation(raw.cancellation) : undefined;
            raw.driver = raw.driver ? new driver_1.PolicyDriver(raw.driver) : undefined;
            raw.duration = raw.duration ? new duration_1.PolicyDuration(raw.duration) : undefined;
            raw.api = api;
            Object.assign(this, raw);
            return this;
        });
    }
    driverApprove({ refresh = true }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let body = {
                driver: {
                    agreedAt: new Date().toISOString(),
                },
            };
            yield this.api.request({
                method: "PATCH",
                endpoint: `policies/${this.id}`,
                data: body,
            });
            if (refresh) {
                yield this.refesh();
            }
        });
    }
    internalApprove({ refresh = true, approvedById }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let body = {
                approval: {
                    approvedAt: new Date().toISOString(),
                },
            };
            if (approvedById) {
                body.approval.approvedBy = approvedById;
            }
            yield this.api.request({
                method: "PATCH",
                endpoint: `policies/${this.id}`,
                data: body,
            });
            if (refresh) {
                yield this.refesh();
            }
        });
    }
    cancel({ refresh = true, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkId();
            let body = {
                cancellation: {
                    cancelledAt: new Date().toISOString(),
                },
            };
            if (message) {
                body.cancellation.message = message;
            }
            yield this.api.request({
                method: "PATCH",
                endpoint: `policies/${this.id}`,
                data: body,
            });
            if (refresh) {
                yield this.refesh();
            }
        });
    }
}
exports.Policy = Policy;
//# sourceMappingURL=index.js.map