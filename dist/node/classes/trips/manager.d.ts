import { APIHandlerAuth } from "../../utils/api";
export declare class TripManager {
    api: APIHandlerAuth;
    sourceId: string;
    orgId: string;
    batchWindow: number;
    lastBatchTime: Date;
    gps: Object[];
    accelerometer: Object[];
    gyroscope: Object[];
    alerts: Object[];
    constructor({ api, sourceId, orgId, batchWindow }: {
        api: APIHandlerAuth;
        sourceId: string;
        orgId: string;
        batchWindow: number;
    });
    clear(): void;
    sendCheck(): Promise<void>;
    addGPS({ lat, lng, gpsAccuracy, altitude, acceleration, speed, bearing, bearingAccuracy, verticalAcceleration, timestamp, }: {
        lat: number;
        lng: number;
        gpsAccuracy: number;
        altitude: number;
        acceleration: number;
        speed: number;
        bearing: number;
        bearingAccuracy: number;
        verticalAcceleration: number;
        timestamp: number;
    }): Promise<void>;
    addAccelerometer({ x, y, z, timestamp }: {
        x: number;
        y: number;
        z: number;
        timestamp: number;
    }): Promise<void>;
    addGyroscope({ x, y, z, timestamp }: {
        x: number;
        y: number;
        z: number;
        timestamp: number;
    }): Promise<void>;
    addAlert({ alertCode, measurement1, measurement2, measurement3, onDevice, shown, timestamp, }: {
        alertCode: string;
        measurement1: number;
        measurement2: number;
        measurement3: number;
        onDevice: boolean;
        shown: boolean;
        timestamp: number;
    }): Promise<void>;
}
//# sourceMappingURL=manager.d.ts.map