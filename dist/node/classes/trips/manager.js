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
exports.TripManager = void 0;
class TripManager {
    constructor({ api, sourceId, orgId, batchWindow }) {
        this.batchWindow = batchWindow;
        if (this.batchWindow < 0) {
            throw new Error("batchWindow must be greater than 0");
        }
        if (this.batchWindow > 60) {
            throw new Error("batchWindow must be less than 60");
        }
        this.api = api;
        this.sourceId = sourceId;
        this.orgId = orgId;
        this.lastBatchTime = new Date();
        this.gps = [];
        this.accelerometer = [];
        this.gyroscope = [];
        this.alerts = [];
    }
    clear() {
        this.gps = [];
        this.accelerometer = [];
        this.gyroscope = [];
        this.alerts = [];
    }
    sendCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.gps.length && !this.accelerometer.length && !this.gyroscope.length && !this.alerts.length) {
                return;
            }
            if (this.batchWindow != 0.0) {
                if (new Date().getTime() - this.lastBatchTime.getTime() < this.batchWindow) {
                    return;
                }
            }
            let body = {
                sourceId: this.sourceId,
                orgId: this.orgId,
                gps: this.gps,
                acc: this.accelerometer,
                gyro: this.gyroscope,
                alerts: this.alerts,
            };
            yield this.api.telematicsRequest({
                method: "POST",
                endpoint: "/track",
                data: body,
            });
            this.clear();
        });
    }
    addGPS({ lat, lng, gpsAccuracy, altitude, acceleration, speed, bearing, bearingAccuracy, verticalAcceleration, timestamp, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lat === undefined || lng === undefined) {
                throw new Error("lat and lng must be provided");
            }
            // check if lat is valid
            if (lat < -90 || lat > 90) {
                throw new Error("lat must be between -90 and 90");
            }
            // check if lng is valid
            if (lng < -180 || lng > 180) {
                throw new Error("lng must be between -180 and 180");
            }
            if (!timestamp) {
                timestamp = new Date().getTime();
            }
            this.gps.push({
                lat,
                lng,
                a: gpsAccuracy,
                alt: altitude,
                acc: acceleration,
                s: speed,
                b: bearing,
                bAcc: bearingAccuracy,
                va: verticalAcceleration,
                ts: timestamp,
            });
            yield this.sendCheck();
        });
    }
    addAccelerometer({ x, y, z, timestamp }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (x === undefined || y === undefined || z === undefined) {
                throw new Error("x, y and z must be provided");
            }
            if (!timestamp) {
                timestamp = new Date().getTime();
            }
            this.accelerometer.push({
                x,
                y,
                z,
                ts: timestamp,
            });
            yield this.sendCheck();
        });
    }
    addGyroscope({ x, y, z, timestamp }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (x === undefined || y === undefined || z === undefined) {
                throw new Error("x, y and z must be provided");
            }
            if (!timestamp) {
                timestamp = new Date().getTime();
            }
            this.gyroscope.push({
                x,
                y,
                z,
                ts: timestamp,
            });
            yield this.sendCheck();
        });
    }
    addAlert({ alertCode, measurement1, measurement2, measurement3, onDevice, shown, timestamp, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (alertCode === undefined) {
                throw new Error("alert_code must be provided");
            }
            if (!timestamp) {
                timestamp = new Date().getTime();
            }
            this.alerts.push({
                code: alertCode,
                m1: measurement1,
                m2: measurement2,
                m3: measurement3,
                onDevice,
                shown,
                ts: timestamp,
            });
            yield this.sendCheck();
        });
    }
}
exports.TripManager = TripManager;
//# sourceMappingURL=manager.js.map