import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { Vehicle } from "../../models/vehicles/rv";
import { DriverRegisteredVehicleBase } from "../../models/vehicles/drv/interface";
export declare class Vehicles {
    storageManager: StorageManager;
    api: APIHandlerAuth | APIHandlerNoAuth;
    getVehicle({ vehicleId, includeTranslations, includeDistance, includeDrvCount, }: {
        vehicleId: string;
        includeTranslations?: boolean;
        includeDistance?: boolean;
        includeDrvCount?: boolean;
    }): Promise<Vehicle>;
    listVehicles({ regPlate, vin, isActive, isApproved, fullResponse, maxRecords, }: {
        regPlate?: string;
        vin?: string;
        isActive?: string;
        isApproved?: string;
        fullResponse?: string;
        maxRecords?: number;
    }): AsyncGenerator<Vehicle, void, unknown>;
    createVehicle({ vehicle, driverId, drv, sendWebhook }: {
        vehicle: Vehicle;
        driverId?: string;
        drv?: DriverRegisteredVehicleBase;
        sendWebhook?: boolean;
    }): Promise<Vehicle>;
}
//# sourceMappingURL=core.d.ts.map